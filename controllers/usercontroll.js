
const modeleuser = require('../modules/user');
const express = require('express');
const app = express();
const transporter = require('../util/sendemails');
const session = require('express-session');
const bcrypt = require('bcryptjs');
class usercontrollers{ 


//signup doctors
static async signupdoctors(req,res){
const city = req.body.address;
const fname = req.body.firstName;
const lname = req.body.lastName;
const nin = req.body.nationalId;
const email = req.body.email; 
const password = req.body.password;
const spec = req.body.specialty;
const phone= req.body.phoneNumber;
const gender = req.body.gender;
const doctorid = req.body.doctorId;
const wilaya  = req.body.providence;
const date = req.body.date;
  const photo = req.body.pfpUrl;
try{   

  var y = await modeleuser.fetchuser(email,password);
  var w = await modeleuser.fetchdoctorrequest(email);
  if(y.length===0 && w.length ===0){

    var x = await modeleuser.insertdoctorstemp(email,password,city,fname,lname,nin,spec,phone,gender,doctorid,wilaya,date,photo)   ;

    if(x===true)  res.status(201).json({message:'inscription reussite'});
    else res.status(400).json({message:'inscription echoué'});}
    else res.status(400).json({message:'this email can not be used'});}
        catch(error){

        }
} 
 //getspecilaity
static async getspeciality(req,res){
try{
    var x = await modeleuser.getspec();
        res.json(x);
    }
catch(error){
    console.log(error);
    res.status(500).json({messgae : 'error'});
}}
// get medecimantes name
static async getmedicaments(req,res){
    try{
        var x = await modeleuser.getmed();
        res.json(x);

    }
    catch(error){
        console.log(error);}
}
// getwilayanames
 static async getanalyses(req,res){
   try {
     var x  = await modeleuser.fetchanalysesname();
     if(!x) {
        res.json({message:'not found'})     } else{
          res.json(x);
        } 
   }
   catch(error){
    res.json({message:error});
   }
}
//adminlogin
  static async getadmin(req,res){
  const i =req.session.userid; console.log(i);
    try{
      var x = await modeleuser.fetchadmin(i);
      if(!x) res.json({message:'not found'});
      else {
        var obj=x[0];
        const fname  = obj.admin_firstname; //console.log(fname);
        const lname = obj.admin_lastname;
        res.json({
        role : 'admin',
        firstname : fname,
        lastname : lname,
    stats:{
     totalPatients:400,
     totalDoctors:5000,
     totalConsultations:1000,
     totalVisitors:2000

    }
        })
      }

    } catch(error){
        console.log(error);
        res.json({message:'error'});
    }


}
//doctorsrequests
  static async doctorsrequests(req,res){
     
    try {
        var x = await modeleuser.fetchdoctorreq();
        if(x){
           console.log(x);
            res.json(x);
        } else res.json('errorooror');
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}
//logindoctor
  static async logindoctor(req,res){
try {
  const id = req.session.userid;
  var x = await modeleuser.fetchdoctor(id);
 
  res.json(x[0]);
} catch (error) {
    res.json(error);
  console.log(error);
}
}
//login
static async login(req,res){
try {
   const email = req.body.email;
   const password = req.body.password;
    var x = await modeleuser.fetchuser(email,password);
    console.log(x);
    if(!x) res.json('not found');
    else {
     const id = x[0].id; 
    const  role = x[0].role;
   // app.locals.userid = id;
    req.session.userid=id;
    console.log(req.session.userid);
       switch (role) {
        case "admin": 
        res.redirect('/admin');
            break;
        case "doctor":
        res.redirect('/doctor');
            break;
        case "patient":
            res.redirect('/patientlogin');
            break;
       }

    }
} catch (error) {
    res.json(error);
  console.log(error);

}
}
//patientsignup
 static async patientsignup(req,res){
 // if(!message) return res.status(400).json({message:'body request not defined'});
    try {
    const addr = req.body.address;
    const blood = req.body.bloodType;
    const pass = req.body.password;
    const datebirth = req.body.dateOfBirth;
    const email = req.body.email;
    const gender = req.body.gender;
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const providence = req.body.providence;
    const weight = req.body.weight;
    const phone = req.body.phoneNumber;
    const height = req.body.height;
    const nin = req.body.nationalId;
    const agreeToPrivacy = req.body.agreeToPrivacy;
    const agreeToTerms = req.body.agreeToTerms;
    const confpasw = req.body.confirmPassword;
    const pfpUrl = req.body.pfpUrl;
    if(agreeToPrivacy===true && agreeToTerms===true && pass===confpasw){
        //exsit of patient
        var y = await modeleuser.fetchuser(email,pass); console.log(y);
        if(y.length ===0) {
        var x = await modeleuser.signuppatinet(addr,email,pass,blood,height,weight,phone,providence,fname,lname,nin,gender,datebirth,pfpUrl);
         if(!x) res.json('eroror');
         else {//res.status(501).json({message:'signup secsessfuly'}); 
         const i = await modeleuser.fetchidpatient(email);
         app.locals.userid=i[0].id;
         res.redirect('/patientlogin');
        }
        } else return res.status(400).json({message:'this email can not be used'});
    }

   } catch (error) {
    console.log(error);
    res.status(400).json({message:error});
   }    
}

static async doctoraccept(req,res){
  
    try {
        const id = req.body.doctorID;
        const emergency = req.body.isEmergency;
        var x = await modeleuser.getdoctortemp(id);
        const email = x[0].email;
        const password = x[0].password;
        var y = await modeleuser.insertdoctorlogin(email,password);
        var z = await modeleuser.fetchuser(email,password);
        const iduser= z[0].id;
        const docfname = x[0].doctor_firstname;
        const doctor_lastname = x[0].doctor_lastname;
        const city = x[0].city;
        const wilaya = x[0].wilaya;
        const gender = x[0].gender;
        const nin = x[0].nin;
        const speciality = x[0].speciality;
        const phone = x[0].phone;
        const birthdate = x[0].birthdate;
      const photo = x[0].image;
        var w = await modeleuser.insertdoctor(id,emergency,iduser,docfname,doctor_lastname,city,wilaya,gender,nin,speciality,phone,birthdate,photo);
         var d = await modeleuser.deletetempdoctor(id);
         const emailtext="hello "+docfname+" "+doctor_lastname+"\nthank you for your signup with us your account like doctor was created !\nsee you soon!! "
         const mailOptions = {
            from: 'Medsecure Website', 
            to: email,
            subject: "accept doctor",
            text: emailtext
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              res.status(500).send('doctor was accepted and Error sending email');
            } else {
              console.log('Email sent:', info.response);
              res.send('doctor was accepted and Email sent successfully');
            }})

    } catch (error) {
        res.json({message:error});
        console.log(error);
    }

}

static async deletetempdoctor(req,res){
    try {
        const id = req.body.doctorID;
        var x = await modeleuser.deletetempdoctor(id);
        res.json({message:"the doctor deleted secsfully"});
    } catch (error) {
        res.json({wrong:error});
    }
}
static async addconsultation(req,res){
   try {
    const analyses = req.body.analysisInputs;
    const docid = req.body.doctorID;
    const consudate  = req.body.consultationDate;
    const consuinfo  = req.body.consultationSummary;
    const med = req.body.medicaments;
    const pat = req.body.patientID;
    const maladie = req.body.maladie;
    var x = await modeleuser.addconsutable(pat,docid,consudate,consuinfo,maladie);
    var s= await modeleuser.fetchconsuid(pat,docid,consudate); const consid = s[0].consultation_id;	
    if(analyses.length>0){
        for (let i=0;i<analyses.length;i++){
            
            const{AnalysisName,AnalysisDate,AnalysisResult} = analyses[i];
           var y = await modeleuser.analysis(consid,AnalysisName,AnalysisDate,AnalysisResult); 
           
        }
    }
    if(med.length>0){
        for(let i=0;i<med.length;i++){
            const medname=med[i];
        y = await modeleuser.insertmed(consid,medname);
    }
    }
    res.json({message:'consultation is enregistred'});
   } catch (error) {
    res.json({error});
    console.log(error);
   }


}
//search pateints from doctors
static async searchpatients(req,res){
    try {
        //const doctorId = req.body.doctorId;
        const namepat = req.body.patientName;
        //var x = await modeleuser.getemergencydoc(doctorId);
        var y = await modeleuser.patientsearch(namepat);
        console.log(y[0].age);
     // console.log(y[0].age.split('T').map(0));
       
        if(y.length!=0){
            y[0].age= await modeleuser.calculerAge(y[0].age);
      
         res.json({
            firstName:y[0].firstName,
            lastName:y[0].lastName,
            age:y[0].age,
            gender:y[0].gender,
            isPublicAccount:y[0].isPublicAccount,
            pfpUrl:y[0].pfpUrl,
            email:y[0].email,
           patientId:y[0].patientId
        })
    }
    else res.json('message: patient not found');
} catch (error) {
        res.json('error:' + error);
        console.log(error);
    }
}
static async loginpatient(req,res){
  try {
   // const id = app.locals.userid;
   const id = req.session.userid;
   
    console.log(id);
  const x = await modeleuser.getpatientinfo(id);
 //x[0].dateOfBirth = new Date(x[0].dateOfBirth).toISOString().split('T')[0];
  x[0].age = await modeleuser.calculerAge(x[0].dateOfBirth);
  //const responseObject ={} x;
  //const responseObject = "users:" + JSON.stringify(x);
  res.json(x[0]);
  } catch (error) {
    res.json(error);
  }
 
}

static async fetchalergies(req,res){
 try {
    const patientId = req.body.patientId;
    const email = req.body.email;
    const y = await modeleuser.fetchidpatient(email);
    if(y[0].id===patientId){
    const x = await modeleuser.getalergiespatient(patientId);
    let i = 0;
   
    res.json(x);
 }
else res.json([]);
} catch (error) {
    res.json(error);
 }
}
static async fetchanalyses(req,res){
    try {
        const id = req.body.patientId;
        const x = await modeleuser.fetchanalyses(id);
      if(x.length>0)
        res.json(x);
else res.json([]);
    } catch (error) {
        res.json(error);
    }
}
static async medicalhistory(req,res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        var x = modeleuser.fetchuserpatient(email,password);
        const id = x[0].idd;

    } catch (error) {
        res,json(error);
    }
}
//original one
 static  async  getMedicalHistory(req, res) {
  
    try {
        const patientId = req.body.patientId;
        const email = req.body.email;
        const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===patientId){
      const consultations = await modeleuser.getConsultations(patientId);
      if (consultations.length === 0) {
        res.json([]);
        return;
      }
  
      const medicalHistory = [];
  
      
      for (const consultation of consultations) {
        const doctor = await modeleuser.getDoctorDetails(consultation.doctorId);
        const medications = await modeleuser.getMedications(consultation.consultationId);
        const analysis = await modeleuser.getAnalysis(consultation.consultationId);
  
       
        const consultationDetails = {
          consultationId: consultation.consultationId,
          category: consultation.category,
          date: consultation.date,
          doctorName: doctor.name,
          ConsultaionDetails: {
            consultationSummary: consultation.consultationSummary,
            maladie:consultation.maladie,
            medicaments: medications.map((medication) => medication.medicationName),
            doctorContact: {
              phoneNumber: doctor.phoneNumber
            },
            analysis: analysis.map((analysis) => ({
              Id: analysis.analysisId,
              date: analysis.date,
              name: analysis.name,
              result: analysis.result
            }))
          }
        };
  
        
        medicalHistory.push(consultationDetails);
      }
  
      res.json(medicalHistory);
   }
  else res.json("error request");
} catch (error) {
      console.error('Erreur lors de la récupération de l\'historique médical : ' + error.stack);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'historique médical' });
    }
  }
  static async getalergies(req,res){
    try {
        var x = await modeleuser.getalergies();
        res.json(x);
    } catch (error) {
        res.json(error);
    }
  }

static async addalergy(req,res){
    try {
        const id =req.body.patientId;
        const allergyName = req.body.allergyName;
        const date = req.body.date;
        const allergySymptoms = req.body.allergySymptoms;
        var x = await modeleuser.addalergy(id,allergyName,date,allergySymptoms);
      res.json("allergy add");
    } catch (error) {
        res.json(error);
        console.log(error);
    }
}

static async profilechangeacess(req,res){
    try {
       const patientId = req.body.patientId;
       const email = req.body.email;
       const profileaccess = req.body.isPublicAccount;
        const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===patientId){
            const y = await modeleuser.setprofileacess(profileaccess,patientId);
            res.json({isPublicAccount:profileaccess});
        } else res.json('error de security')
    } catch (error) {
        res.json({"error":error});
        console.log(error);
    }
}
static async getprofilestatus(req,res){
  try {
    const patientId = req.body.patientId;
    const email = req.body.email;
    const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===patientId){
          var y = await modeleuser.getprofileaccess(patientId);  
          res.json(y[0]);          
        }
    else res.json("error de secirity");
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}

static async viewprofile(req,res){
  try {
    const id = req.body.patientId;
    const email = req.body.email;
    const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===id){
             req.session.userid = id;
             res.redirect('/patientlogin');
        }
  } catch (error) {
    res.json(error);
  }
}

static async getmaladies(req,res){
  try {
    var x = await modeleuser.getmaladies();
    res.json(x);
  } catch (error) {
    res.json(error);
  }
}
static async operations(req,res){
  try {
    var x = await modeleuser.getoperations();
    res.json(x);
  } catch (error) {
    res.json(error);
  }
}
static async setoperations(req,res){
  try{
 const patientId = req.body.patientId;
    const name = req.body.name;
  const details = req.body.details;
  const doctorId = req.body.doctorId;
  const date =req.body.date;
  var x = await modeleuser.setopertaionspatient(patientId,name,details,doctorId,date);
  res.json("operation add");}

  catch(error){ res.json(error);}
}
static async setspecmaladies(req,res){
  try{
 const patientId = req.body.patientId;
    const name = req.body.name;
  const details = req.body.details;
  const doctorId = req.body.doctorId;
  const date =req.body.date;
  var x = await modeleuser.setspecmaladies(patientId,name,details,doctorId,date);
  res.json("operation add");}

  catch(error){ res.json(error);}
}
static async getoperationspatients(req,res){
  try {
    const id = req.body.patientId;
    const email = req.body.email;
    const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===id){
          const y = await modeleuser.fetchopeartionspatients(id);   
          res.json(x);
        } else res.json([]);
  } catch (error) {
    res.json(error);
  }
}
static async getspecmaladiespatients(req,res){
  try {
    const id = req.body.patientId;
    const email = req.body.email;
    const x = await modeleuser.fetchidpatient(email);
        if(x[0].id===id){
          const y = await modeleuser.fetchspecmaladiespatients(id);   
          res.json(x);
        } else res.json([]);
  } catch (error) {
    res.json(error);
  }
}

  static async sendemailsnews (req, res)  {
const email = req.body.email; 
try{
var x = await modeleuser.insertemailnews(email);}
catch (error){
  res.json(error);
}

    const mailOptions = {
      from: 'MedSecure Website', 
      to: email,
      subject: "Newsletter joining",
      text: "Hi there \nWe're thrilled that you're joining our newsletter. You'll receive updates every week. \nThank you\nMedsecure Support"
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  };
  

}
module.exports = usercontrollers;


const modeleuser = require('../modules/user');
const express = require('express');
const app = express();


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
        const specialities = x.map(result => result.spes_des);
        res.json(specialities);
    }
catch(error){
    console.log(error);
    res.status(500).json({messgae : 'error'});
}}
// get medecimantes name
static async getmedicaments(req,res){
    try{
        var x = await modeleuser.getmed();
    
            const specialities = x.map(result => result.med_name);
            res.json(specialities);
    
        
    }
    catch(error){
        console.log(error);}
}
// getwilayanames
 static async getwilayanames(req,res){
   try {
     var x  = await modeleuser.fetchwilayanames();
     if(!x) {
        res.json({message:'not found'})     } else{
            const wilaya = x.map(result => result.wilaya_name);
            res.json(wilaya);
        } 
   }
   catch(error){
    res.json({message:error});
   }
}
//adminlogin
  static async getadmin(req,res){
  const i =app.locals.userid; console.log(i);
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
  const id = app.locals.userid;
  var x = await modeleuser.fetchdoctor(id);
const base64String = x[0].pfpUrl.toString('base64');
const imageUrl = `data:image/jpeg;base64,${base64String}`;
  x[0].pfpUrl = imageUrl;
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
    app.locals.userid = id; 
       switch (role) {
        case "admin": 
        res.redirect('/admin');
            break;
        case "doctor":
        res.redirect('/doctor');
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
    const datebirth = req.body.dateofBirth;
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
    if(agreeToPrivacy==='true' && agreeToTerms==='true' && pass===confpasw){
        //exsit of patient
        var y = await modeleuser.fetchuser(email,pass); console.log(y);
        if(y.length ===0) {
        var x = await modeleuser.signuppatinet(addr,email,pass,blood,height,weight,phone,providence,fname,lname,nin,gender,datebirth);
         if(!x) res.json('eroror');
         else res.status(501).json({message:'signup secsessfuly'}); 

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
        res.json({message:'doctor was accepted secfully'});
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
    var x = await modeleuser.addconsutable(pat,docid,consudate,consuinfo);
    x= await modeleuser.fetchconsuid(pat,docid,consudate); const consid = x[0].consultation_id;	
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





}
module.exports = usercontrollers;

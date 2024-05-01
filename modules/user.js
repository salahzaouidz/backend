
const db  = require("../util/database");

 class Usermodel{


static async insertdoctorstemp(email,password,city,fname,lname,nin,spec,phone,gender,doctorid,wilaya,date,photo){
//var values = [email , password , role];
return new Promise (resolve =>{
    db.query('insert into doctor_temp values(?,?,?,?,?,?,?,?,?,?,?,?,?)',[doctorid,email,password,fname,lname,city,wilaya,gender,nin,spec,phone,date,photo],(err,result)=>{
        if (err) {
resolve(false);    console.log(err);        
 }
      
else
        resolve(true);   
     });
})


}
// fonction get spec
static getspec(){
    return new Promise ((resolve,reject) =>{
        db.query('select id_spes as id,spes_des as name from spesialite',(err,result)=>{
            if (err) {
    reject(err);            
     }
          
    else
            resolve(result);   

         });

//db.end();
})}
 //getmedicaments names
static getmed(){
    return new Promise ((resolve,reject) =>{
        db.query('select med_id as id , med_name as name from medicaments',(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(false);    console.log(err);        
     }
          
    else
            resolve(result);   

         });
   // db.end();
})    
}
static fetchanalysesname(){
    return new Promise ((resolve,reject) =>{
        db.query('select analyse_id as id,analyse_designation as name from analyses;',(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(err);    console.log(err);        
     }
          
    else
            resolve(result);   

         });
   // db.end();
}) }

static fetchadmin(i){
    return new Promise ((resolve,reject) =>{
        db.query('select admin_firstname,admin_lastname from admin where admin_id=?',[i],(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(err);           
     }
          
    else
            resolve(result);   

         });
   // db.end();
})
    
}
static fetchdoctorreq(){
    return new Promise ((resolve,reject) =>{
        db.query('SELECT temp_id as doctorId,CONCAT(doctor_firstname," ",doctor_lastname) as DoctorName,email ,city as address,wilaya as providence,phone,speciality as specialty,DATE_FORMAT(datesignup, "%Y-%m-%d") as date,gender,image as pfpUrl from doctor_temp',(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(err);           
     }
          
    else
  //  console.log(result);
            resolve(result);   

         });
})

 }
static fetchdoctor(id){
    return new Promise ((resolve,reject) =>{
        const a = [id];
        db.query('SELECT doctor_id as doctorId,doctor_firstname as firstName,doctor_lastname as lastName,user_login.email,doctor_sexe as gender,phone,doc_spes as specialty,doctor_city as address,doctor_wilaya as providence,doctor_NIN as NIN,isemergency as isEmergency,"doctor" as role,image as pfpUrl from doctors join user_login on doctors.id_user_doc=user_login.user_id where id_user_doc=?',[id],(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(err);           
     }
          
    else
  //  console.log(result);
            resolve(result);   

         });
})
  }
static fetchuser(email,password){
        return new Promise ((resolve,reject) =>{
            db.query('select user_id as id,role from user_login where email=? and password=?',[email,password],(err,result)=>{
                //console.log("sql");
                if (err) {
        reject(err);           
         }
              
        else
      //  console.log(result);
                resolve(result);   
                console.log(result);
    
             });
    })


    }
   
static signuppatinet(addr,email,pass,blood,height,weight,phone,providence,fname,lname,nin,gender,datebirth,pfpUrl){
        return new Promise ((resolve,reject) =>{
            db.query('INSERT into user_login (email,password,role) VALUES (?,?,"patient");',[email,pass],(err,result)=>{
                if (err) {
                    reject(err);           
                } else {
                    //console.log(result);
                    this.fetchuserpatient(email, pass)
                        .then((xx) => {

                            const id = xx[0].idd; // Assuming the query result gives an array with at least one element
                            db.query('INSERT into patients VALUES (?,?,?,?,?,?,?,?,?,?,?,?,"0",?)',[id,nin,fname,lname,datebirth,gender,addr,providence,height,weight,blood,phone,pfpUrl],(err,result)=>{
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(true);
                                }
                            });
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
        });

       }
static fetchuserpatient(email,pass){
        return new Promise ((resolve,reject) =>{
            db.query('select user_id as idd from user_login where email=? and password=?',[email,pass],(err,result)=>{
                //console.log("sql");
                if (err) {
        reject(err);           
         }
              
        else
      //  console.log(result);
                resolve(result);   
               // console.log(result);
    
             });
    })


    }
static fetchdoctorrequest(email){
    return new Promise ((resolve,reject) =>{
        db.query('SELECT * from doctor_temp where email=?',[email],(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(err);           
     }
          
    else
  //  console.log(result);
            resolve(result);   

         });
})
  }
    
  
static getdoctortemp(id){
    return new Promise ((resolve,reject) =>{
        db.query('SELECT * from doctor_temp where temp_id=?',[id],(err,result)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(result);

    }

         });
})
}

static insertdoctorlogin(email,password){
    return new Promise ((resolve,reject) =>{
        db.query('insert into user_login (email,password,role) values (?,?,"doctor")',[email,password],(err,result)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true);

    }

         });
})
}

 static insertdoctor(id,emergency,iduser,docfname,doctor_lastname,city,wilaya,gender,nin,speciality,phone,birthdate,photo){
    return new Promise ((resolve,reject) =>{
        db.query('insert into doctors values (?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,iduser,nin,docfname,doctor_lastname,speciality,birthdate,gender,city,wilaya,phone,emergency,photo],(err)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true);

    }

         });
})

 }
static deletetempdoctor(id){
    return new Promise ((resolve,reject) =>{
        db.query('delete from doctor_temp where temp_id=?',[id],(err)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true);

    }

         });
})
}

static addconsutable(pat,docid,consudate,consuinfo){
    return new Promise ((resolve,reject) =>{
        db.query('insert into consultation values(default,?,?,?,?)',[consudate,consuinfo,pat,docid],(err)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true);

    }

         });
})
}

static analysis(consid,AnalysisName,AnalysisDate,AnalysisResult){
    return new Promise ((resolve,reject) =>{
        db.query('insert into analyses_consu values(?,?,?,?)',[consid,AnalysisName,AnalysisResult,AnalysisDate],(err)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true);

    }

         });
})
}

static fetchconsuid(pat,docid,consudate){
    return new Promise ((resolve,reject) =>{
        db.query('select consultation_id from consultation where consultation_date=? and pat_id=? and doc_id=? ',[consudate,pat,docid],(err,result)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(result); 

    }

         });
})
}
static insertmed(consid,medname){
    return new Promise ((resolve,reject) =>{
        db.query('insert into med_consu values(?,?)',[consid,medname],(err)=>{
            if (err) {
    reject(err);           
     }
          
    else{
resolve(true); 

    }

         });
})
}
static getemergencydoc(doctorId){
    return new Promise ((resolve,reject) =>{
        db.query('select isemergency from doctors where doctor_id=?',[doctorId],(err,res)=>{
            if (err) {
    reject(err);           
     }    
    else{
resolve(res);
    }
         });
}) 
}
static patientsearch(patname){
    return new Promise ((resolve,reject) =>{
        db.query('select patient_id as patientId,patient_firstname as firstName , patient_lastname as lastName, DATE_FORMAT(patient_dateb, "%Y-%m-%d") as age , patient_sexe as gender ,patient_photo as pfpUrl, profileaccess as isPublicAccount,user_login.email as email from patients,user_login where patients.patient_id=user_login.user_id and concat(patient_firstname," ",patient_lastname)=?;',[patname],(err,res)=>{
            if (err) {
    reject(err);           
     }    
    else{
resolve(res);
    }
         });
}) 
}
static getpatientinfo(id){
    return new Promise ((resolve,reject) =>{
        db.query('select patient_id as id,patient_firstname as firstName,patient_lastname as lastName,patient_height as height,patient_weight as weight, patient_bloodtype as bloodType , DATE_FORMAT(patient_dateb, "%Y-%m-%d") as dateOfBirth,user_login.email as email , patients.phone as phone , 00 as age ,patient_sexe as gender,patient_city as address,patient_wilaya as providence ,"patient" as role , patient_photo as pfpUrl from patients,user_login where patients.patient_id=user_login.user_id and patient_id=?;',[id],(err,res)=>{
            if (err) {
    reject(err);           
     }    
    else{
resolve(res);
    }
         });
}) 

}
static getalergiespatient(patientId){
    return new Promise ((resolve,reject) =>{
        db.query('SELECT alergies.aler_name as name , aler_note as symptoms ,DATE_FORMAT(alerdate , "%Y-%m-%d @ %H:%i")as date from alergies_patient,alergies where alergies_patient.idaler=alergies.aler_id and idpat=? ORDER by date DESC;',[patientId],(err,res)=>{
            if (err) {
    reject(err);           
     }    
    else{
resolve(res);
    }
         });
}) 
}
static fetchanalyses(id){
    return new Promise ((resolve,reject) =>{
        db.query('SELECT concat(cons_id,ana_id) as analysisId ,DATE_FORMAT(ana_date, "%Y-%m-%d @ %H:%i") as date,analyses.analyse_designation as analysisName,concat(doctors.doctor_firstname," ",doctors.doctor_lastname) as doctor,analyse_resultat as comments from analyses_consu,analyses,consultation,doctors where analyses_consu.ana_id=analyses.analyse_id and analyses_consu.cons_id=consultation.consultation_id and consultation.doc_id=doctors.doctor_id and consultation.pat_id=?;',[id],(err,res)=>{
            if (err) {
    reject(err);           
     }    
    else{
resolve(res);
    }
         });
})  
}
static getConsultations(patientId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT consultation_id as consultationId, DATE_FORMAT(consultation_date,"%Y-%m-%d") as date, consultation_details as consultationSummary, doctors.doc_spes as category, doctors.doctor_id as doctorId FROM consultation, doctors WHERE consultation.doc_id = doctors.doctor_id AND pat_id = ?`; 
      db.query(query, [patientId], (err, consultations) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(consultations);
      });
    });
  }
  
  // Fonction pour récupérer les détails d'un médecin
  static getDoctorDetails(doctorId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT CONCAT(doctor_firstname, " ", doctor_lastname) as name, phone as phoneNumber FROM doctors WHERE doctor_id = ?`;
  
      db.query(query, [doctorId], (err, doctor) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(doctor[0]);
      });
    });
  }
  
  // Fonction pour récupérer les médicaments d'une consultation
  static getMedications(consultationId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT medicaments.med_name as medicationName FROM med_consu, medicaments WHERE med_consu.cons_id = ? AND med_consu.med_id = medicaments.med_id`;
  
      db.query(query, [consultationId], (err, medications) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(medications);
      });
    });
  }
  
  // Fonction pour récupérer les analyses d'une consultation
  static getAnalysis(consultationId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT CONCAT(cons_id, "", ana_id) as analysisId, DATE_FORMAT(ana_date, "%Y-%m-%d @ %H:%i") as date, analyses.analyse_designation as name, analyse_resultat as result FROM analyses_consu, analyses WHERE analyses_consu.cons_id = ? AND analyses_consu.ana_id = analyses.analyse_id`;
  
      db.query(query, [consultationId], (err, analysis) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(analysis);
      });
    });
  }

 static fetchidpatient(email){
    return new Promise((resolve, reject) => {
        const query = `select user_id as id from user_login where email=?`;
    
        db.query(query, [email], (err, result) => {
          if (err) {
            reject(err);
            return;
          }
    
          resolve(result);
        });
      });
 } 
static getalergies(){
    return new Promise((resolve, reject) => {
        const query = `select aler_id as id,aler_name as name from alergies`;
    
        db.query(query, (err, result) => {
          if (err) {
            reject(err);
          }
    
          resolve(result);
        });
      });
}
static addalergy(id,allergyName,date,allergySymptoms){
    return new Promise((resolve, reject) => {
        const query = `insert into alergies_patient values(?,?,?,?)`;
    
        db.query(query,[id,allergyName,date,allergySymptoms], (err, result) => {
          if (err) {
            reject(err);
          }
    
          resolve(result);
        });
      });
}
static setprofileacess(profileaccess,patientId){
    return new Promise((resolve, reject) => {
        const query = `update patients set profileaccess=? where patient_id=?;`;
    
        db.query(query,[profileaccess,patientId], (err, result) => {
          if (err) {
            reject(err);
          }
    
          resolve(result);
        });
      });
}
static getprofileaccess(patientId){
  return new Promise((resolve, reject) => {
    const query = `select profileaccess as isPublicAccount from patients WHERE patient_id=?;`;

    db.query(query,[patientId], (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
}
static insertemailnews(email){
  return new Promise((resolve, reject) => {
    const query = `insert into newslatteremails values(default,?)`;

    db.query(query,[email], (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
}

static calculerAge(dateNaissanceStr) {
    // Diviser la chaîne de caractères en jour, mois et année
   //const [annee, mois, jour] = dateNaissanceStr;//.split('-').map(Number);annee, mois - 1, jour
  
    // Créer un objet Date à partir de la chaîne de caractères
    const dateNaissance = new Date(dateNaissanceStr); // Mois - 1 car les mois sont indexés à partir de 0
  
    // Obtenir la date actuelle
    const dateActuelle = new Date();
  
    // Calculer la différence entre les deux dates en millisecondes
    const differenceMs = dateActuelle - dateNaissance;
  
    // Convertir la différence de millisecondes en années
    const age = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365));
  
    return age;
  }
 }
 module.exports = Usermodel;

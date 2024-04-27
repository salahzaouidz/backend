
const db  = require("../util/database");

 class Usermodel{


static async insertdoctorstemp(email,password,city,fname,lname,nin,spec,phone,gender,doctorid,wilaya,date){
//var values = [email , password , role];
return new Promise (resolve =>{
    db.query('insert into doctor_temp values(?,?,?,?,?,?,?,?,?,?,?,?)',[doctorid,email,password,fname,lname,city,wilaya,gender,nin,spec,phone,date],(err,result)=>{
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
        db.query('select spes_des from spesialite',(err,result)=>{
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
        db.query('select med_name from medicaments',(err,result)=>{
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
  static fetchwilayanames(){
    return new Promise ((resolve,reject) =>{
        db.query('select wilaya_name from wilaya',(err,result)=>{
            //console.log("sql");
            if (err) {
    reject(false);    console.log(err);        
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
        db.query('SELECT temp_id as doctorId,CONCAT(doctor_firstname," ",doctor_lastname) as DoctorName,email ,city as address,wilaya as providence,phone,speciality as specialty,birthdate as date,gender from doctor_temp',(err,result)=>{
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
        db.query('SELECT doctor_id as id,doctor_firstname as firstname,doctor_lastname as lastname,user_login.email,doctor_sexe as gender,phone,doc_spes as speciality,doctor_city as address,doctor_wilaya as providence,doctor_NIN as NIN,"doctor" as role from doctors join user_login on doctors.id_user_doc=user_login.user_id where id_user_doc=?',[id],(err,result)=>{
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
   
       static signuppatinet(addr,email,pass,blood,height,weight,phone,providence,fname,lname,nin,gender,datebirth){
        return new Promise ((resolve,reject) =>{
            db.query('INSERT into user_login (email,password,role) VALUES (?,?,"patient");',[email,pass],(err,result)=>{
                if (err) {
                    reject(err);           
                } else {
                    //console.log(result);
                    this.fetchuserpatient(email, pass)
                        .then((xx) => {

                            const id = xx[0].idd; // Assuming the query result gives an array with at least one element
                            db.query('INSERT into patients VALUES (?,?,?,?,?,?,?,?,?,?,?,?,"0")',[id,nin,fname,lname,datebirth,gender,addr,providence,height,weight,blood,phone],(err,result)=>{
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

 static insertdoctor(id,emergency,iduser,docfname,doctor_lastname,city,wilaya,gender,nin,speciality,phone,birthdate){
    return new Promise ((resolve,reject) =>{
        db.query('insert into doctors values (?,?,?,?,?,?,?,?,?,?,?,?)',[id,iduser,nin,docfname,doctor_lastname,speciality,birthdate,gender,city,wilaya,phone,emergency],(err)=>{
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
 }
 module.exports = Usermodel;

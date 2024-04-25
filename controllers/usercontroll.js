
const modeleuser = require('../modules/user');
const express = require('express');
const app = express();


class usercontrollers{


//signup doctors
static async signupdoctors(req,res){
const city = req.body.address;
const fname = req.body.firstname;
const lname = req.body.lastname;
const nin = req.body.nationalId;
const email = req.body.email; 
const password = req.body.confirmdPassword;
const spec = req.body.specialty;
const phone= req.body.phoneNumber;
const gender = req.body.gender;
const doctorid = req.body.doctorId;
const wilaya  = req.body.providence;
try{   

  var y = await modeleuser.fetchuser;
  var w = await modeleuser.fetchdoctorrequest(email);
  if(y===0 && w ===0){

    var x = await modeleuser.insertdoctorstemp(email,password,city,fname,lname,nin,spec,phone,gender,doctorid,wilaya)   ;

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
     totalPatients:250,
     totaldoctors:50,
     totalConsulations:1000,
     totalVisitors:5000

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
    res.json(x[0]);
} catch (error) {
    res.json(error);
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
        res.redirect('https://backend-medsecure.onrender.com/admin');
            break;
        case "doctor":
        res.redirect('https://backend-medsecure.onrender.com/doctor');
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
        const id = req.body.id;
        const emergency = req.body.emergency;
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
        var w = await modeleuser.insertdoctor(id,emergency,iduser,docfname,doctor_lastname,city,wilaya,gender,nin,speciality,phone,birthdate);
         var d = await modeleuser.deletetempdoctor(id);
        res.json({message:'doctor was accepted secfully'});
    } catch (error) {
        res.json({message:error});
        console.log(error);
    }

}

static async deletetempdoctor(){
    try {
        const id = req.body.id;
        var x = await modeleuser.deletetempdoctor(id);
        res.json({message:"the doctor deleted secsfully"});
    } catch (error) {
        res.json({error})
    }
}
}

module.exports = usercontrollers;

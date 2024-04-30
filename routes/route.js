const router = require('express').Router();
const controllers = require('../controllers/usercontroll');

//endpoints project

router.post('/doctors/signup',controllers.signupdoctors); //doctor signup
router.get('/specialty',controllers.getspeciality); //speciality
router.get('/alergys',controllers.getalergies)
router.get('/medname',controllers.getmedicaments); //medecines name
router.get('/wilayanames',controllers.getwilayanames); //wilayanames
router.get('/admin',controllers.getadmin); //login admin
router.get('/admin/doctorsrequests',controllers.doctorsrequests); //doctorrequests
router.get('/doctor',controllers.logindoctor);//login doctor
router.post('/login',controllers.login);//login
router.post('/patient/signup',controllers.patientsignup); //patient signup
router.post('/admin/doctoraccept',controllers.doctoraccept); //acceptdoctornoramleandemergency
router.post('/admin/rejectdoctor',controllers.deletetempdoctor);//deletetempdoctor
router.post('/consultationadd',controllers.addconsultation); //add consultations
router.post('addalergy',controllers.addalergy)
router.post('/searchpatients',controllers.searchpatients);
router.get('/patientlogin',controllers.loginpatient);
router.get('/patient/allergies',controllers.fetchalergies);
router.get('/patient/analyses',controllers.fetchanalyses);
router.get('/patient/medicalhistory',controllers.getMedicalHistory);
router.post('/newlattersub',controllers.sendemailsnews);

module.exports = router;

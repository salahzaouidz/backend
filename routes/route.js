const router = require('express').Router();
const controllers = require('../controllers/usercontroll');

//endpoints project

router.post('/doctors/signup',controllers.signupdoctors); 
router.get('/specialty',controllers.getspeciality); 
router.get('/alergys',controllers.getalergies)
router.get('/medname',controllers.getmedicaments); 
router.get('/analyses',controllers.getanalyses); 
router.get('/admin',controllers.getadmin); 
router.get('/admin/doctorsrequests',controllers.doctorsrequests); 
router.get('/doctor',controllers.logindoctor);
router.post('/login',controllers.login);
router.post('/patient/signup',controllers.patientsignup); 
router.post('/admin/doctoraccept',controllers.doctoraccept); 
router.post('/admin/rejectdoctor',controllers.deletetempdoctor);
router.post('/consultationadd',controllers.addconsultation); 
router.post('/addalergy',controllers.addalergy)
router.post('/searchpatients',controllers.searchpatients);
router.get('/patientlogin',controllers.loginpatient);
router.post('/patient/allergies',controllers.fetchalergies);
router.post('/patient/analyses',controllers.fetchanalyses);
router.post('/patient/medicalhistory',controllers.getMedicalHistory);
router.post('/newlattersub',controllers.sendemailsnews);
router.post('/getprofilestatus',controllers.getprofilestatus);
router.post('/setprofilestatus',controllers.profilechangeacess);
router.post('/viewprofile',controllers.viewprofile);
router.get('/operationNames',controllers.operations);
router.get('/maladies',controllers.getmaladies);
router.post('/setmaladies',controllers.setspecmaladies);
router.post('/setoperations',controllers.setoperations);
router.post('/getoperationspatient',controllers.getoperationspatients);
router.post('/getmaladiespatients',controllers.getspecmaladiespatients);

module.exports = router;

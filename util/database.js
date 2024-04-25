const mysql = require('mysql2');

const pool = mysql.createPool({
host : 'localhost',
user: 'root',
database: 'medsecure',
password: ''


});
pool.getConnection((err)=>{
    if(!err)
    console.log("database connected")  ; 
})

module.exports =  pool;
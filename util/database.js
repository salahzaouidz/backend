const mysql = require('mysql2');

const pool = mysql.createPool({
host : 'sql.freedb.tech',
user: 'freedb_salahuser',
database: 'freedb_medsecure',
password: '*nV#J6P*2xQCyMc'

 
});
pool.getConnection((err)=>{    
    if(!err)
    console.log("database connected")  ; 
})

module.exports =  pool;

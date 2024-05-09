const mysql = require('mysql2');

const pool = mysql.createPool({
host : 'sql.freedb.tech',
user: 'freedb_useruser',
database: 'freedb_medsecure',
password: 'Vtc4kC*UaC%c6C7'

 
});
pool.getConnection((err)=>{    
    if(!err)
    console.log("database connected")  ; 
})

module.exports =  pool;

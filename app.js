const express = require('express')
const session = require('express-session');
const app = express();
const users  = require('./routes/route')
const bodyParser = require('body-parser')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true })) 
// Parse JSON bodies (as sent by API clients)
app.use(session({  //for global variable and send data from midlware to other midlware
secret :'a',
resave : false,
saveUninitialized : false
}));
app.use(users);  //endpoints start


app.use('/',(req,res)=>{
    res.send('<html><body><h1>hello from medsecure server</h1></body></html>');
})




app.listen(3000);

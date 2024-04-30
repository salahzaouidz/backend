const express = require('express')
const session = require('express-session');
const cors = require('cors');
const app = express();
const users  = require('./routes/route')
const bodyParser = require('body-parser')
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.json({ limit: '20mb' }))

app.use(bodyParser.urlencoded({ limit: '20mb',extended: true })) 
// Increase the limit for JSON requests
app.use(express.json({ limit: '20mb' }));

// Increase the limit for URL-encoded requests
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(session({  //for global variable and send data from midlware to other midlware
secret :'a',
resave : false,
saveUninitialized : false
}));
app.use(users);  //endpoints start


app.use(cors());




app.listen(3000);

const express = require('express')
const cors = require('cors');
const app = express();
const users  = require('./routes/route')
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb',extended: true })) 
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.use(users);  //endpoints start







app.listen(3000);

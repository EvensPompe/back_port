const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router/router');

//Convertion Application/json
app.use(bodyParser.json());

// Convertion application/x-www-form-urlencoded
// Paramètre '{extended: false}' signifie que la donnée url sera converti avec la librairie querystring
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use("/",router)


app.listen(process.env.PORTSERVER,()=>{
  console.log('Serveur sur le port '+process.env.PORTSERVER);
});

const express = require('express');
const app = express();
let port = 4567

const router = require('./router/router.js');

const bodyParser = require('body-parser');
const cors = require('cors');

//Convertion Application/json
app.use(bodyParser.json());

// Convertion application/x-www-form-urlencoded
// Paramètre '{extended: false}' signifie que la donnée url sera converti avec la librairie querystring
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.use(router)


app.listen(port,()=>{
  console.log('Serveur sur le port '+port);
});

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
//url du serveur mongodb
const url = `mongodb://localhost:${process.env.PORTDB}/portefolio`;

let options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

mongoose.connect(url, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("C'est connecté !");
});

const _projet = new mongoose.Schema({
  nom:String,
  img:String,
  desc:String,
  lien:String
});

const projet = mongoose.model("projet",_projet);

module.exports = projet;

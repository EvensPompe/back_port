const express = require('express');
const router = express.Router();

//Ajout du package mongodb
const mongodb = require('mongodb');
//fournit un ensemble de fonctions d'assertion pour vérifier les invariants. Le module fournit un strictmode recommandé et un mode hérité plus clément.
const assert = require('assert');

//Nouvel instance du client MongoDB
const MongoClient = mongodb.MongoClient;

//Nom de la collection
const dbName = "portefolio"
//url du serveur mongodb
const url = "mongodb://localhost:27017"

//Nouveau client du serveur MongoDB
const client = new MongoClient(url);

// Nouvelle connexion du client vers le serveur MongoDB
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  db.createCollection("projet")
//  client.close();
});

router.get('/projets',(req,res)=>{
  // Nouvelle connexion du client vers le serveur MongoDB
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    db.collection("projet").find().toArray(function(err, results) {
     res.json(results)
     });
    client.close();
  });
})

router.post('/new',(req,res)=>{
  let projet = {
    nom:req.body.nom,
    img:req.body.img,
    desc:req.body.desc,
    date:req.body.date,
    lien:req.body.lien
  }
  // Nouvelle connexion du client vers le serveur MongoDB
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    db.collection("projet").findOne({nom:req.body.nom},(err,results)=>{
      console.log(results);
      if (err) {
        res.json(err)
      }else {
        if (!results) {
          db.collection("projet").insertOne(projet,(err,data)=>{
            res.json(data)
          });
        }else {
          res.json("Le projet existe déjà !")
        }
      }
    })
    client.close();
  });
})

// // Nouvelle connexion du client vers le serveur MongoDB
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   client.close();
// });

module.exports = router;

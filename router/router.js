const express = require('express');
const router = express.Router();

const db = require('../database/db.js');

router.get('/projets', (req, res) => {
   db.find({},(err,projet)=>{
     if (err) throw err;
     res.json(projet)
   })
});

router.post('/new', (req, res) => {
  let projet = {
    nom:req.body.nom,
    img:req.body.img,
    desc:req.body.desc,
    lien:req.body.lien
  }
  db.create(projet,(err,data)=>{
    if (err) throw err;
    res.json(data)
  })
});

module.exports = router;

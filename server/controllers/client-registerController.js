const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var crypto = require('crypto');
var config = require('../config/index.js');

var EncryptionKey = config.EncryptionKey;
var { ClientRegister } = require('../models/client-register');
var { Login } = require('../models/login');

// localhost:3000/ClientRegistraion/
router.get('/' , (req,res) => {
    ClientRegister.find((err,docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined,2));}
    });
});

router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        ClientRegister.findById(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving ClientRegister: '+ JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req,res) => {
 var clientRegister = new ClientRegister({
    FirstName : req.body.FirstName,
    LastName : req.body.LastName,
    MobileNo : req.body.MobileNo,
    Email : req.body.Email,
    DOB : req.body.DOB,
    Password : req.body.Password,

    IsAdmin : req.body.IsAdmin,
 });
 clientRegister.save((err, doc) => {
     if(!err) {res.send(doc);}
     else { console.log('Error in Client Registration Save: '+ JSON.stringify(err, undefined, 2));}
 });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var clientRegister = {
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        MobileNo : req.body.MobileNo,
        Email : req.body.Email,
        DOB : req.body.DOB,
        IsAdmin : req.body.IsAdmin,
     };
     ClientRegister.findByIdAndUpdate(req.params.id,{$set: clientRegister},{new: true},(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Update Registration: '+ JSON.stringify(err, undefined, 2));}
     });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    ClientRegister.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Delete Registraion: '+ JSON.stringify(err, undefined, 2));}
    });
});

var isTrue;

router.post('/byEmail/', (req,res) => {
    var clientRegister = new ClientRegister({
        Email : req.body.Email,
        Password :req.body.Password
     });
       isTrue = ClientRegister.find({"Email":clientRegister.Email, "Password":clientRegister.Password},(err,docs) => {
        if(!err) {res.send(docs);}
        else { console.log('Error in retriving ClinetRegister: ' + JSON.stringify(err, undefined,2));}
    });
});
module.exports = router;

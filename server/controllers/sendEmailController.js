const express = require('express');
var router = express.Router(); 
var email 	= require('emailjs');

router.function((req,res) => {
    
var server 	= email.server.connect({
   user:    'vcvarshacreation@gmail.com', 
   password:'123', 
   host:    'smtp.your-email.com', 
   ssl:     true
});
 
// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    'i hope this works', 
   from:    'vcvarshacreation@gmail.com', 
   to:      req.body.email,
   subject: 'testing emailjs'
}, function(err, message) { 
    if(err)
    console.log(err)
    else
    return res.json({success: true, msg: 'send'});
 });
});


module.exports = router;
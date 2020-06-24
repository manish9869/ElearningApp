const express = require('express');
const emailService = require('../service/email.service');
var router = express.Router();
var { Contact } = require('../models/contact');

// router.post('/', (req, res) => {
//     emailService.sendEmail(req.body.email, req.body.sub, req.body.body, function (err) {
//         if (err) {
//             return res.send(err)
//         }
//         res.send({ success: true })
//     })
//     /* course.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Course Save: ' + JSON.stringify(err, undefined, 2)); }
//     }); */
// });


router.post('/', (req,res) => {
    var contact = new Contact({
        Name : req.body.Name,
        Email : req.body.Email,
        Message : req.body.Message
    });
    emailService.sendEmail(contact.Email,contact.Name,contact.Message, function (err) {
                if (err) {
                    return res.send(err)
                } else {
                }
            })
            res.send({ success: true });
            contact.save((err, doc) => {
                if(!err) {res.send(doc);}
                else { console.log('Error in Course Save: '+ JSON.stringify(err, undefined, 2));}
            });
   });



module.exports = router;

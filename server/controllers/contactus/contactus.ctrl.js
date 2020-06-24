var ObjectId = require('mongoose').Types.ObjectId;
var { Contact } = appRequire('model.contactus');
var emailService = appRequire('service.email');

module.exports = {
    create: create,
}

function create(req, res, next) {

  var contact = new Contact({
    Name : req.body.Name,
    Email : req.body.Email,
    Message : req.body.Message
  });


var Message = "<table border><tr><th>Name</th> <th>Email</th> <th>Message</th></tr><tr><td>"+contact.Email+"</td><td>"+contact.Name+"</td><td>"+contact.Message+"</td></tr></table>"


  emailService.sendEmail( 'vcvarshacreation@gmail.com',"Enquiry Details",Message, function (err) {
    if (err)
    return res.send(err)
  })
    contact.save((err, doc) => {
      if(!err) {res.send(doc);}
      else { console.log('Error in Course Save: '+ JSON.stringify(err, undefined, 2));}
  });
}






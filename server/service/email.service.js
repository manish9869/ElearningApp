var email = require('emailjs');


function sendEmail(toEmailIdArr, subject, body, callback) {
    var server = email.server.connect({
        user: 'vcvarshacreation@gmail.com',
        password: 'varsha123',
        host: 'smtp.gmail.com',
        ssl: true
    });

    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        text: body,
        //html: body,
        from: 'vcvarshacreation@gmail.com',
        to: toEmailIdArr,
        subject: subject
    }, function (err, message) {
        if (err){
            console.log("Failed to send mails" +err + JSON.stringify(message));
            callback(err)
        } else
            // return res.json({ success: true, msg: 'send' });
            return callback(null);
    });
}


module.exports = {
    sendEmail: sendEmail
};

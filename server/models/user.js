const mongoose = require('mongoose');

var User = mongoose.model('User',{
    
    FirstName : { type: String },
    LastName : { type: String },
    Email : { type: String },
    Password : { type: String },
    IsAdmin : { type: Boolean },
    OTP: { type: String },
    IsActive: {type: Boolean}
},'User');


module.exports = {User};
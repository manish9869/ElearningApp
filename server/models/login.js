const mongoose = require('mongoose');

var Login = mongoose.model('Login',{
    
    Email: {type: String},
    Password: {type: String}
},'Login');


module.exports = {Login};
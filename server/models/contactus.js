const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var Contact = mongoose.model('Contact',{
   // _id: Schema.Types.ObjectId,
    Name: {type: String},
    Email: {type: String},
    Message: {type: String}
},'Contact');


module.exports = {Contact};

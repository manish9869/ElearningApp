const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ElearningDB', (err) => {
    if(!err)
        console.log('MongoDB connection succeeded');
    else
        console.log('Error in Connection: '+ JSON.stringify(err, undefined, 2));
});
 
module.exports = mongoose;

 

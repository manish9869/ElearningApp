
var ObjectId = require('mongoose').Types.ObjectId;

const mongoose = require('mongoose');
var { Chapter } = require('../models/chapter');
var { Course }= require('../models/course');
var { Topic } = require('../models/topic');
var { User } = require('../models/user');



//console.log(Chapter)
var chapID= "5ba621ff74f87327c489fe52"
mongoose.connect('mongodb://localhost:27017/ElearningDB', (err) => {
if(!err)
console.log('MongoDB connection succeeded');
else
console.log('Error in Connection: '+ JSON.stringify(err, undefined, 2));


 
    var user = {
       
        Email: 'manishchavan016@gmail.com',
       
        IsActive:true
    };

  
   

    User.findOneAndUpdate({Email: user.Email}, {$set:{IsActive:user.IsActive}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });

});


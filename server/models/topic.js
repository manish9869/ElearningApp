const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// var Topic = Schema({
//     _id: Schema.Types.ObjectId,  
//     CourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
//     ChapterID: { type: Schema.Types.ObjectId, ref: 'Chapter' },
//     TopicName: { type: String},
//     TopicDesc : {type: String},
//     VideoURL: { type: String }
// })

// module.exports = {Topic};


var Topic = mongoose.model('Topic',{
   // _id: Schema.Types.ObjectId,  
    CourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
    ChapterID: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    TopicName: { type: String},
    TopicDesc : {type: String},
    VideoURL: { type: String },
    Serial: { type: Number },
    VideoLength: { type: String }
},'Topic');


module.exports = {Topic};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var Course = Schema ({
//     _id: Schema.Types.ObjectId,
//     CourseName: {type: String},
//     CourseDesc: {type: String},
//     Chapter: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
// })
// module.exports =  mongoose.model('Course', Course);

var Course = mongoose.model('Course',{
   // _id: Schema.Types.ObjectId,
    CourseName: {type: String},
    TechnologyName: {type: String},
    CourseDesc: {type: String},
    Chapter: [{ type: String, ref: 'Chapter' }]
},'Course');


module.exports = {Course};
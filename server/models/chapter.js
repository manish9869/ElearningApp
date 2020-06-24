const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Chapter =  mongoose.model('Chapter',{
    //_id: Schema.Types.ObjectId,
    CourseID: { type: Schema.Types.ObjectId, ref: 'Course' },
    ChapterName: {type: String},
    ChapterDesc: {type: String},
    Serial: { type: Number },
    Topic: [{ type: String, ref: 'Topic' }]
},'Chapter');
module.exports = {Chapter};
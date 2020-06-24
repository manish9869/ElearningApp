const mongoose = require('mongoose');

var Blog = mongoose.model('Blog',{
    BlogCategory: { type:String },
    BlogLevel : { type: String },
    BlogTitle: { type : String },
    BlogAbstract : { type: String },
    BlogContent: { type: String },
    BlogVideoURL: { type: String },
    BlogImageUrls: [{ type: String }],
    BlogAuthor: { type: String },
    BlogPostedOn: { type: Date }
},'Blog');


module.exports = { Blog };
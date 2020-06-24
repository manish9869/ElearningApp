var ObjectId = require('mongoose').Types.ObjectId;

var { Topic } = appRequire('model.topic');
var { Chapter } = appRequire('model.chapter');


module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    readByChapterId: readByChapterId,

    readByTopicId: readByTopicId
}

function readAll(req, res, next) {
    Topic.find()
        .populate({
            path: 'ChapterID',

            populate: {
                path: 'CourseID',

            }
        })
        .exec((err, docs) => {
            if (!err) { res.send(docs); }
            else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
        });
}
function read(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Topic.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function create(req, res, next) {
    var topic = new Topic({
        CourseID: req.body.CourseID,
        ChapterID: req.body.ChapterID,
        TopicName: req.body.TopicName,
        TopicDesc: req.body.TopicDesc,
        VideoURL: req.body.VideoURL,
        Serial: req.body.Serial,
        VideoLength: req.body.VideoLength
    });
    topic.save((err, doc) => {
        if (!err) {
            Chapter.findByIdAndUpdate(req.body.ChapterID, { $push: { 'Topic': doc._id } }, function (err, doc) {
                if (!err) {
                    res.send(doc);
                }
                else { console.log('Error in Chapter Course: ' + JSON.stringify(err, undefined, 2)); }
            });
        }
        else { console.log('Error in Topic Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function update(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var topicId = req.params.id
    var topic = {
        CourseID: req.body.CourseID,
        ChapterID: req.body.ChapterID,
        TopicName: req.body.TopicName,
        TopicDesc: req.body.TopicDesc,
        VideoURL: req.body.VideoURL,
        Serial: req.body.Serial,
        VideoLength: req.body.VideoLength
    };
    Topic.findById(req.body._id, (err, topicDoc) => {
        if (!err) {
            // check if chapter reference is changed
            if (topicDoc.ChapterID != topic.ChapterID) {
                // remove topic reference from chapter, since chapter is changed
                Chapter.update(
                    { "_id": topicDoc.ChapterID },
                    {
                        $pull: {
                            Topic: topicId
                        }
                    }, {
                        multi: true
                    }
                )
                    .exec((err, oldChapterDoc) => {
                        // console.log('removed topic from older chapter ', JSON.stringify(oldChapterDoc))
                        // Add new topic refence to chapter
                        Chapter.findByIdAndUpdate(req.body.ChapterID, { $push: { 'Topic': topicId } }, function (err, newChapterDoc) {
                            if (!err) {
                                // console.log('added current topic to new  chapter ', JSON.stringify(newChapterDoc))
                                // Update Topic
                                Topic.findByIdAndUpdate(topicId, { $set: topic }, { new: true }, (err, doc) => {
                                    if (!err) { return  res.send(doc); }
                                    else { console.log('Error in Update Topic: ' + JSON.stringify(err, undefined, 2)); }
                                });
                            }
                            else { console.log('Error in Chapter Course: ' + JSON.stringify(err, undefined, 2)); }
                        });
                    })
            } else {
                Topic.findByIdAndUpdate(topicId, { $set: topic }, { new: true }, (err, doc) => {
                    if (!err) { return res.send(doc); }
                    else { console.log('Error in Update Topic: ' + JSON.stringify(err, undefined, 2)); }
                });
            }
        }
    })
}
function del(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    Topic.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Topic: ' + JSON.stringify(err, undefined, 2)); }
    });
}

function readByChapterId(req, res, next) {
    Topic.find({ ChapterID: req.params.id})
        .populate('Chapter', 'ChapterName')
       
        .exec((err, docs) => {
            if (!err) { res.send(docs); }
            else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
        });
}

// function readByTopicId(req, res, next) {
//     Topic.find({ TopicID: req.params.id })
//         .exec((err, docs) => {
//             if (!err) { res.send(docs); }
//             else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
//         });
// }


function readByTopicId(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Topic.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Chapter: ' + JSON.stringify(err, undefined, 2)); }
    });
}

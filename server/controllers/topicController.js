const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Topic } = require('../models/topic');
var { Chapter } = require('../models/chapter');

// localhost:3000/Topic/
router.get('/', (req, res) => {
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

});




router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Topic.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
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
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var topic = {
        CourseID: req.body.CourseID,
        ChapterID: req.body.ChapterID,
        TopicName: req.body.TopicName,
        TopicDesc: req.body.TopicDesc,
        VideoURL: req.body.VideoURL,
        Serial: req.body.Serial,
        VideoLength: req.body.VideoLength
    };
    Topic.findByIdAndUpdate(req.params.id, { $set: topic }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update Topic: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    Topic.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Topic: ' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/byChapterID/:id', (req, res) => {
    Topic.find({ ChapterID: req.params.id })
        .populate('Chapter', 'ChapterName')
        .exec((err, docs) => {
            if (!err) { res.send(docs); }
            else { console.log('Error in retriving Topic: ' + JSON.stringify(err, undefined, 2)); }
        });
});


module.exports = router;
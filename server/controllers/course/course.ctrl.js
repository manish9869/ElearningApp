var ObjectId = require('mongoose').Types.ObjectId;

var { Course } = appRequire('model.course');


module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,
}

function readAll(req, res, next) {
    Course.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving Course: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function read(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    Course.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Course: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function create(req, res, next) {
    var course = new Course({
        CourseName: req.body.CourseName,
        CourseDesc: req.body.CourseDesc,
        TechnologyName : req.body.TechnologyName
    });
    course.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Course Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function update(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var course = {
        CourseName: req.body.CourseName,
        CourseDesc: req.body.CourseDesc,
        TechnologyName : req.body.TechnologyName
    };
    Course.findByIdAndUpdate(req.params.id, { $set: course }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update Course: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function del(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Course: ' + JSON.stringify(err, undefined, 2)); }
    });
}
// localhost:3000/Course/
/* router.get('/' , (req,res) => {
});

router.get('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

        Course.findById(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in retriving Course: '+ JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req,res) => {
 var course = new Course({
    CourseName : req.body.CourseName,
    CourseDesc : req.body.CourseDesc
 });
 course.save((err, doc) => {
     if(!err) {res.send(doc);}
     else { console.log('Error in Course Save: '+ JSON.stringify(err, undefined, 2));}
 });
});

router.put('/:id', (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    var course = {
        CourseName : req.body.CourseName,
        CourseDesc : req.body.CourseDesc
     };
     Course.findByIdAndUpdate(req.params.id,{$set: course},{new: true},(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Update Course: '+ JSON.stringify(err, undefined, 2));}
     });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

    Course.findByIdAndRemove(req.params.id,(err, doc) => {
        if(!err) {res.send(doc);}
        else { console.log('Error in Delete Course: '+ JSON.stringify(err, undefined, 2));}
    });
});
module.exports = router; */

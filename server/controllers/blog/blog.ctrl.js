var ObjectId = require('mongoose').Types.ObjectId;

var { Blog } = appRequire('model.blog');


module.exports = {
    create: create,

    update: update,

    delete: del,

    read: read,

    readAll: readAll,

    readBybyCategory: readBybyCategory,

    readTop5: readTop5
}

function readAll(req, res, next) {
    Blog.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }

       
    });
}

function readTop5(req, res, next) {
    
    Blog.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }

    }).limit(5);

    console.log(req.params.id);
}

function read(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
}



function create(req, res, next) {
    var blog = new Blog({
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    });
    blog.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Save: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function update(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var blog = {
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    };
    Blog.findByIdAndUpdate(req.params.id, { $set: blog }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update blog: ' + JSON.stringify(err, undefined, 2)); }
    });
}
function del(req, res, next) {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
}

function readBybyCategory(req, res, next) {
    
    Blog.find({ "BlogCategory": req.params.id }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving BlogCategory: ' + JSON.stringify(err, undefined, 2)); }
    });
}




/* // localhost:3000/Blog/
router.get('/', (req, res) => {
    Blog.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in retriving Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var blog = new Blog({
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    });
    blog.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Blog Save: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);
    var blog = {
        BlogCategory: req.body.BlogCategory,
        BlogLevel: req.body.BlogLevel,
        BlogTitle: req.body.BlogTitle,
        BlogAbstract: req.body.BlogAbstract,
        BlogContent: req.body.BlogContent,
        BlogVideoURL: req.body.BlogVideoURL,
        BlogImageUrls: req.body.BlogImageUrls,
        BlogAuthor: req.body.BlogAuthor,
        BlogPostedOn: req.body.BlogPostedOn
    };
    Blog.findByIdAndUpdate(req.params.id, { $set: blog }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`);

    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Delete Blog: ' + JSON.stringify(err, undefined, 2)); }
    });
});



router.get('/byCategory/:id', (req, res) => {

    Blog.find({ "BlogCategory": req.params.id }, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in retriving BlogCategory: ' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router; */
//var fs = require('fs');
var path = require('path');
var fs = require('fs');
var root = path.normalize(__dirname + './../../../');
var fileUploadRoot = path.normalize(__dirname + './../../../');;
// var emailConfig = JSON.parse(fs.readFileSync(root + 'server/config/keys/phoenix-2fb9e31eda41.json'));
var config = {
    root: path.normalize(__dirname + './../../../../'),

    // host: 'test.com',

    // host: '127.0.0.1',
    host: 'localhost',

    port: 3000,

    rethinkdb: {
        host: "localhost",
        port: 28015,
        authKey: "",
        db: "MIS"
    },
    imageUploadFolder: "uploads",
    imageUploadPath: fileUploadRoot + 'uploads\\',
    imageUploadURL: "http://" + this.host + ":" + this.port + '/uploaded_images/',
    EncryptionKey: "TheKey123",
    blogImagePlaceholderRegex : /{{{blog_id}}}/g
};

module.exports = config;
//http://localhost:8001/logo/
var Express = require('express');
var Controller = appRequire('ctrl.contactus');
var Router = Express.Router();



Router.post('/', Controller.create);


module.exports = Router;

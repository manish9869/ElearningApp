var Express = require('express');
var Controller = appRequire('ctrl.blog');
var Router = Express.Router();

Router.get('/', Controller.readAll);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

Router.get('/Top5/:id', Controller.readTop5);
Router.get('/byCategory/:id', Controller.readBybyCategory);
module.exports = Router;
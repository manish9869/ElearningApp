var Express = require('express');
var Controller = appRequire('ctrl.chapter');
var Router = Express.Router();


Router.get('/', Controller.readAll);
Router.get('/:id', Controller.read);
Router.get('/bycourse/:id', Controller.readByCourseId);
Router.get('/byChapter/:id', Controller.readByCourseIdAndPopulateTopic);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

module.exports = Router;
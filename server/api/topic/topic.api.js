var Express = require('express');
var Controller = appRequire('ctrl.topic');
var Router = Express.Router();


Router.get('/', Controller.readAll);
Router.get('/byChapterID/:id', Controller.readByChapterId);

Router.get('/:id', Controller.readByTopicId);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);
Router.delete('/:id', Controller.delete);

module.exports = Router;
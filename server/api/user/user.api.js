var Express = require('express');
var Controller = appRequire('ctrl.user');
var Router = Express.Router();

Router.get('/', Controller.readAll);
Router.get('/:id', Controller.read);
Router.post('/', Controller.create);
Router.put('/:id', Controller.update);
Router.post('/byEmail', Controller.readByEmailId);

Router.delete('/:id', Controller.delete);
Router.post('/Email', Controller.readByEmail);

Router.post('/byEmailOTP', Controller.readByEmailOTP);

Router.post('/byEmailIsActive', Controller.readbyEmailIsActive);

Router.put('/updateByMail/:id', Controller.updateByMail);


module.exports = Router;
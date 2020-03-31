const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const ongsValidation = require('./middlewares/validators/ongs.validation');
const incidentsValidation = require('./middlewares/validators/incidents.validation');
const sessionsValidation = require('./middlewares/validators/sessions.validation');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.get('/ongs', OngController.index);
routes.post('/ongs', ongsValidation.create, OngController.create);
routes.post('/sessions', sessionsValidation.create, SessionController.create);

routes.use(authMiddleware);

routes.get('/incidents', incidentsValidation.index, IncidentsController.index);
routes.post('/incidents', incidentsValidation.create, IncidentsController.create);
routes.delete('/incidents/:id', incidentsValidation.delete, IncidentsController.delete);

routes.get('/profiles', ProfileController.index);

module.exports = routes;
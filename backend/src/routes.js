const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const ongsValidation = require('./middlewares/validators/ongs.validation');
const incidentsValidation = require('./middlewares/validators/incidents.validation');
const profilesValidation = require('./middlewares/validators/profiles.validation');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', ongsValidation.create, OngController.create);

routes.get('/incidents', incidentsValidation.index, IncidentsController.index);
routes.post('/incidents', incidentsValidation.create, IncidentsController.create);
routes.delete('/incidents/:id', incidentsValidation.delete, IncidentsController.delete);

routes.get('/profiles', profilesValidation.index, ProfileController.index);

module.exports = routes;
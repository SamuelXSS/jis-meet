const express = require('express');
const AuthController = require('./controllers/AuthController');
const InterestController = require('./controllers/InterestController');
const SecretController = require('./controllers/SecretController');
const UserController = require('./controllers/UserController');

const routes  = express.Router();
require('dotenv').config()
const version = process.env.APP_VERSION

//AUTH ... 
routes.post(version + '/auth', AuthController.store)
routes.post(version + '/user', UserController.store)
routes.get(version + '/user', UserController.index)

//SECRETS OK
routes.post(version + '/secret', SecretController.store)
routes.get(version + '/secret', SecretController.index)
routes.get(version + '/secrets', SecretController.show)

routes.post(version + '/users/:user_id/interest', InterestController.store)
routes.delete(version + '/users/:user_id/interest', InterestController.delete)
routes.get(version + '/users/:user_id/interest', InterestController.index)

module.exports = routes;
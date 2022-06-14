const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add apps
 *  @method GET /add-app
 */
route.get('/add-app', services.add_app)

/**
 *  @description for update app
 *  @method GET /update-app
 */
route.get('/update-app', services.update_app)


// API
route.post('/api/apps', controller.create);
route.get('/api/apps', controller.find);
route.get('/api/apps/:id', controller.find);
route.put('/api/apps/:id', controller.update);
route.delete('/api/apps/:id', controller.delete);


module.exports = route
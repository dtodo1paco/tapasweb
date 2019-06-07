var express = require('express');
var router = express.Router();

const API_BASE = require('../config/paths').API_BASE;

const locationsSetup = require('../modules/locations/controller');
const timetableSetup = require('../modules/timetable/controller');
const restaurantsSetup = require('../modules/restaurants/controller');
const timetableRestaurantSetup = require('../modules/0R_tt_r/controller');

// API setup

module.exports = (app, db) => {
  timetableSetup(API_BASE, app, db);
  locationsSetup(API_BASE, app, db);
  restaurantsSetup(API_BASE, app, db);
  timetableRestaurantSetup(API_BASE, app, db);
}

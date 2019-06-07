const RESTAURANT_MODULE_NAME = require('../restaurants/constants').NAME;
const TIMETABLE_MODULE_NAME = require('../timetable/constants').NAME;

const MODULE_NAME = require('./constants').NAME;
const moment = require('moment');
module.exports = (sequelize, type) => {
  const Model = sequelize.define(MODULE_NAME, {
    id: {
      type: type.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false
    }
  });

  return Model;
};
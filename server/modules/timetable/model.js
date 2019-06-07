const RESTAURANT_MODULE_NAME = require('../restaurants/constants').NAME;
const TT_R_MODULE_NAME = require('../0R_tt_r/constants').NAME;
const TIMETABLE_DETAIL_MODULE_NAME = require('../timetable_detail/constants').NAME;
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
    },
    name: {
      type: type.STRING(50),
      allowNull: false,
      unique: true,
    },
    enabled: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
  Model.associate = function (models) {
    Model.belongsToMany(models[RESTAURANT_MODULE_NAME], {
      through: models[TT_R_MODULE_NAME],
      as: RESTAURANT_MODULE_NAME,
      attributes: ['id'],
    });
    Model.hasMany(models[TIMETABLE_DETAIL_MODULE_NAME], {
      as: TIMETABLE_DETAIL_MODULE_NAME
    })
  };

  return Model;
};
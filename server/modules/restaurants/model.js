const LOCATION_MODULE_NAME = require('../locations/constants').NAME;
const TIMETABLE_MODULE_NAME = require('../timetable/constants').NAME;
const TT_R_MODULE_NAME = require('../0R_tt_r/constants').NAME;

const MODULE_NAME = require('./constants').NAME;


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
    address: {
      type: type.STRING(150),
      allowNull: false,
    },
    enabled: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    underscored: true,
    timestamps: false,
    createAt: true,
    paranoid: true,
  },
//  { indexes: [ { unique: true, fields: [ 'someUnique' ] } ] },
  );
  Model.associate = (models) => {
    Model.belongsTo(models[LOCATION_MODULE_NAME]);
    Model.belongsToMany(models[TIMETABLE_MODULE_NAME], {
      through: models[TT_R_MODULE_NAME],
      as: TIMETABLE_MODULE_NAME,
      attributes: ['id'],

    });
  };
  Model.FILTERS = {
    findAll: {
      where:  {
        enabled: true
      }
    }
  };

  return Model;
}
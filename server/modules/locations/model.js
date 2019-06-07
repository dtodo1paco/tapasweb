const MODULE_NAME = require('./constants').NAME;

module.exports = (sequelize, type) => {
  return sequelize.define(MODULE_NAME, {
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
  })
};
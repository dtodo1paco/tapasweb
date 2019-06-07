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
    open: {
      type: type.DATE,
      allowNull: false,
      unique: false,
      get: function() {
        let time = this.getDataValue('open')
        if (moment(time, moment.ISO_8601, true).isValid()) {
          return moment(time).format('HH:mm');
        } else {
          return time;
        }
      },
      set: function(val) {
        const m = moment(new Date(0));
        const v = moment(val, "HH:mm");
        m.hours(v.hours()).minutes(v.minutes());
        this.setDataValue('open', m);
      }
    },
    close: {
      type: type.DATE,
      allowNull: false,
      unique: false,
      get: function() {
        let time = this.getDataValue('close')
        if (moment(time, moment.ISO_8601, true).isValid()) {
          return moment(time).format('HH:mm');
        } else {
          return time;
        }
      },
      set: function(val) {
        const m = moment(new Date(0));
        const v = moment(val, "HH:mm");
        m.hours(v.hours()).minutes(v.minutes());
        this.setDataValue('close', m);
      }
    },
    day: {
      type: type.ENUM('L','M','X','J','V','S','D'),
      allowNull: false,
      unique: false,
    },
    enabled: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {
    createAt: false,
    updateAt: false,
    }
  );
  return Model;
};
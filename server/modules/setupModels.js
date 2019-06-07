'use strict';

const fs = require('fs');
const path = require('path');
const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.js')[env];
const db = {};

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => join(source, name)).filter(isDirectory)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}


getDirectories(__dirname).forEach(module => {
  const modelPath = path.join(module, 'model.js');
  console.log("setting up model for: " + module);
  const model = sequelize['import'](modelPath);
  console.log("model [" + model.name + "] registered");
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync({ force: false, logging: console.log }).then(() => {
  console.log(`Database & tables created!`)
})
module.exports = db;
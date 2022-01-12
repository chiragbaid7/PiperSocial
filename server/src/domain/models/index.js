'use strict'

const path = require('path');
const basename = path.basename(__filename);
const fs = require('fs');
const Sequelize = require('sequelize')
const {development} = require('../../config/config');
const db = {};

const sequelize = new Sequelize(
    development.database,
    development.username, 
    development.password, {
        host: development.host,
        dialect: 'mysql'
})

// Create models using sequelize connection instance.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelname=>{
  if(db[modelname].associate){
    db[modelname].associate(db);
  }
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;

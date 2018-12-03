/* eslint-disable */
const _ = require('lodash');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const createModels = (connection) => {
  const models = {};
  const files = fs.readdirSync(__dirname);

  files.forEach((file) => {
    if (/\.js$/.test(file) && file !== 'index.js') {
      const model = require(`./${file}`)(connection);
      models[model.modelName] = model;
    }
  });

  return models;
};

module.exports = (connection = mongoose.connection) => {
  if (!_.isEmpty(mongoose.models)) {
    return mongoose.models;
  }

  return createModels(connection);
};

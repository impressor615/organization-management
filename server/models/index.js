/* eslint-disable */
const _ = require('lodash');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const createModels = (connection) => {
  const files = fs.readdirSync(__dirname);
  files.forEach((file) => {
    if (/\.js$/.test(file) && file !== 'index.js') {
      const { createModel } = require(`./${file}`);
      createModel(connection);
    }
  });
};

module.exports = (connection = mongoose.connection) => {
  const models = connection.models;
  if (!_.isEmpty(models)) {
    return models;
  }

  createModels(connection);
  return models;
};

const Promise = require('bluebird');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const errors = require('../errors');
const models = require('../models')();
const constants = require('../constants/models');

global.Promise = Promise;
chai.should();
chai.use(chaiHttp);
chai.app = app;
chai.errors = errors;
chai.models = models;
chai.constants = constants;
chai.assertError = (error, compareObj) => {
  const errorObj = JSON.parse(error);
  errorObj.message.should.to.equal(compareObj.en);
  errorObj.type.should.to.equal('error');
};

const Promise = require('bluebird');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const errors = require('../errors');
const models = require('../models');

global.Promise = Promise;
chai.should();
chai.use(chaiHttp);
chai.app = app;
chai.errors = errors;
chai.models = models;
chai.assertError = (error, compareObj) => {
  const errorObj = JSON.parse(error);
  errorObj.message.should.to.equal(compareObj.en);
  errorObj.code.should.to.equal(compareObj.code);
  errorObj.type.should.to.equal('error');
};

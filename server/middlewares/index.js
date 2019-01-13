/* eslint-disable */
const bodyParser = require('body-parser');
const compression = require('compression');

const parseLanguage = require('./parseLanguage');
const pagination = require('./pagination');
const auth = require('./auth');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('combined'));
  }
  app.use(bodyParser.json());
  app.use(compression());
  app.use(parseLanguage);
  app.use(pagination);
  app.use(/^\/api\/user\/teams.*$/, auth);
  app.use(/^\/api\/users.*$/, auth);
};

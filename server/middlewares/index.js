/* eslint-disable */
const bodyParser = require('body-parser');

const parseLanguage = require('./parseLanguage');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('combined'));
  }
  app.use(bodyParser.json());
  app.use(parseLanguage);
};

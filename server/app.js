const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const CONFIG = require('config');

const setupMiddlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const { mongodb } = CONFIG;
(async () => {
  mongoose.Promise = Promise;
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`,
      { useNewUrlParser: true },
    );
  }

  setupMiddlewares(app);
  app.use('/api/users', routes(router));
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`server listening on port ${PORT}`);
    });
  }
})();

module.exports = app;

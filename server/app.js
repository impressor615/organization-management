const fs = require('fs');
const express = require('express');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const setupMiddlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const CONFIG = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
const {
  DB_HOST, DB_PORT, DB_DATABASE, JWT_SECRET,
} = CONFIG;
(async () => {
  mongoose.Promise = Promise;
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    );
  }

  setupMiddlewares(app);
  app.set('jwt-secret', JWT_SECRET);
  app.use('/api', routes(router));
  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
      // eslint-disable-next-line
      console.log(`server listening on port ${PORT}`);
    });
  }
})();

module.exports = app;

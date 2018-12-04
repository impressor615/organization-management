const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { User } = require('../models')();
const errors = require('../errors');
const { sendError } = require('../utils/routeUtils');

const verifyPassword = async (password, user) => (
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, user.salt, 100000, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      const result = key.toString('base64') === user.password;
      resolve(result);
    });
  })
);

const issueToken = async (
  payload,
  secret,
  options = {
    expiresIn: '7d',
    issuer: 'orgchart.com',
    subject: 'userInfo',
  },
) => (
  new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      options,
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  })
);

const verifyToken = async (token, secret) => (
  new Promise((resolve, reject) => (
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  ))
);

module.exports = (router) => {
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      sendError({ res, language: req.language });
      return;
    }

    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      sendError({ res, language: req.language });
      return;
    }

    const result = await verifyPassword(password, user);
    if (!result) {
      sendError({
        res,
        language: req.language,
        error: errors.not_authorized,
      });
      return;
    }

    const secret = req.app.get('jwt-secret');
    const accessToken = await issueToken(user, secret);
    return res.json({ access_token: accessToken });
  });

  router.all('*', async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    if (!token) {
      sendError({
        res,
        language: req.language,
        error: errors.not_authorized,
      });
      return;
    }

    const secret = req.app.get('jwt-secret');
    try {
      await verifyToken(token, secret);
      next();
    } catch (err) {
      sendError({
        res,
        language: req.language,
        error: errors.not_authorized,
      });
    }
  });
};

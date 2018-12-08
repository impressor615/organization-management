const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/routeUtils');
const errors = require('../errors');

const verifyToken = async (token, secret) => (
  new Promise((resolve, reject) => (
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  ))
);

module.exports = async (req, res, next) => {
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
    const user = await verifyToken(token, secret);
    req.user = user;
    next();
  } catch (err) {
    sendError({
      res,
      language: req.language,
      error: errors.not_authorized,
    });
  }
};

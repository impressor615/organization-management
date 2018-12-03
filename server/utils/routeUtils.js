const errors = require('../errors');

module.exports = {
  sendError: ({
    res,
    language,
    error = errors.route_invalid_data,
    status = 400,
  }) => (
    res
      .status(status)
      .json({
        type: 'error',
        message: error[language] || error.en,
      })
  ),
};

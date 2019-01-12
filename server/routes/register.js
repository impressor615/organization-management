const { User } = require('../models')();
const { sendError } = require('../utils/routeUtils');
const { generatePassword } = require('../utils/pwdUtils');
const errors = require('../errors');

module.exports = (router) => {
  router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      sendError({ res, language: req.language });
      return;
    }
    const passwordObj = await generatePassword(password);
    req.body.pssword = '*';
    req.body.email = '*';

    try {
      const result = await User.create({
        email,
        ...passwordObj,
      });
      return res.json({ _id: result._id.toString() });
    } catch (e) {
      sendError({
        res,
        language: req.language,
        error: errors.register_failed,
      });
    }
  });
};

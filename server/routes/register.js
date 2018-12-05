const crypto = require('crypto');

const { User, Company } = require('../models')();
const { sendError } = require('../utils/routeUtils');

const generatePassword = async (password) => {
  const salt = await new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('base64'));
    });
  });

  const encryptedPassword = await new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) reject(err);
      resolve(key.toString('base64'));
    });
  });

  return {
    password: encryptedPassword,
    salt,
  };
};

module.exports = (router) => {
  router.post('/register', async (req, res) => {
    const { email, password, company_name } = req.body;
    if (!email || !password || !company_name) {
      sendError({ res, language: req.language });
      return;
    }
    const passwordObj = await generatePassword(password);
    req.body.pssword = '*';
    req.body.email = '*';

    const company = await Company.create({ name: company_name });
    const result = await User.create({
      email,
      company_id: company._id.toString(),
      authority: User.Authority.admin,
      ...passwordObj,
    });
    return res.json({ _id: result._id.toString() });
  });
};

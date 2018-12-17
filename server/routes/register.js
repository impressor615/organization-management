const { User, Company } = require('../models')();
const { sendError } = require('../utils/routeUtils');
const { generatePassword } = require('../utils/pwdUtils');

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

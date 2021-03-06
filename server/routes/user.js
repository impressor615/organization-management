const { User, Company } = require('../models')();
const { not_authorized } = require('../errors');
const { sendError } = require('../utils/routeUtils');
const { generatePassword } = require('../utils/pwdUtils');
const { AUTHORITY } = require('../constants/models');

module.exports = (router) => {
  router.post('/users', async (req, res) => {
    const { user } = req;
    const {
      company_id,
    } = user;
    const {
      email,
      department_id,
      name,
      phone,
      position,
    } = req.body;

    if (user.authority !== AUTHORITY.admin) {
      sendError({ res, language: req.language, error: not_authorized });
      return;
    }

    if (!department_id) {
      sendError({ res, language: req.language });
      return;
    }

    // TODO: improve how user's paasword is set at the first time
    const pwdObj = await generatePassword('12345678');
    const userData = {
      email,
      company_id,
      department_id,
      name,
      phone,
      position,
      ...pwdObj,
    };

    try {
      const result = await User.create(userData);
      res.json({ _id: result._id.toString(), created_at: result.created_at });
    } catch (error) {
      sendError({ res, language: req.language });
    }
  });

  // TODO: apply pagiantion and filter later
  router.get('/users', async (req, res) => {
    const { query, user } = req;
    let { dept_ids = [] } = query;

    if (dept_ids.length === 0) {
      const company = await Company.findById(user.company_id).lean().exec();
      dept_ids = (company.departments || []).map(dept => dept._id.toString());
    }

    const condition = {
      department_id: {
        $in: dept_ids,
      },
    };
    const users = await User.find(condition, '-password -salt').lean().exec();
    res.json(users);
  });

  router.put('/users/:id', async (req, res) => {
    const { user } = req;
    const {
      email,
      department_id,
      name,
      phone,
      position,
    } = req.body;

    if (user.authority !== AUTHORITY.admin) {
      sendError({ res, language: req.language, error: not_authorized });
      return;
    }

    const update = {
      email,
      department_id,
      name,
      phone,
      position,
    };
    const options = {
      new: true,
      runValidators: true,
    };

    await User.findByIdAndUpdate(req.params.id, update, options);
    res.json({});
  });

  router.delete('/users/:id', async (req, res) => {
    const { user } = req;
    if (user.authority !== AUTHORITY.admin) {
      sendError({ res, language: req.language, error: not_authorized });
      return;
    }

    await User.findByIdAndRemove(req.params.id);
    res.json({});
  });
};

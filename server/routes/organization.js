const { Organization, User } = require('../models')();
const { sendError } = require('../utils/routeUtils');
const { AUTHORITY } = require('../constants/models');

module.exports = (router) => {
  router.post('/organizations', async (req, res) => {
    const { user, body } = req;
    const { name } = body;

    if (!name) {
      sendError({ res, language: req.language });
      return;
    }

    const organization = await Organization.create({ name });
    const theUser = await User.findById(user._id).exec();
    const org_id = organization._id.toString();
    theUser.organizations = { org_id, authority: AUTHORITY.admin };
    await theUser.save();

    res.json({ _id: org_id });
  });

  // router.get('/company', async (req, res) => {
  //   const { user } = req;
  //   const { company_id } = user;
  //   const theCompany = await Company.findById(company_id).lean().exec();
  //   res.json(theCompany);
  // });

  // router.post('/company/departments', async (req, res) => {
  //   const { user, body } = req;
  //   const { name, parent_id } = body;
  //   const { company_id } = user;

  //   if (!name) {
  //     sendError({ res, language: req.language });
  //     return;
  //   }

  //   try {
  //     const theCompany = await Company.findById(company_id).exec();
  //     theCompany.departments.push({ name, parent_id });
  //     const result = await theCompany.save();
  //     const theDepartment = result.toObject().departments
  //       .find(department => department.name === name);
  //     res.json({ _id: theDepartment._id.toString() });
  //   } catch (err) {
  //     sendError({ res, language: req.language });
  //   }
  // });

  // router.get('/company/departments', async (req, res) => {
  //   const { user } = req;
  //   const { company_id } = user;

  //   const theCompany = await Company.findById(company_id).lean().exec();
  //   res.json(theCompany.departments);
  // });

  // router.put('/company/departments/:id', async (req, res) => {
  //   const { user, body } = req;
  //   const { name, parent_id } = body;
  //   const { company_id } = user;

  //   if (!name) {
  //     sendError({ res, language: req.language });
  //     return;
  //   }

  //   const theCompany = await Company.findById(company_id).exec();
  //   const theDept = theCompany.departments
  //     .find(department => department._id.toString() === req.params.id);

  //   theDept.name = name;
  //   theDept.parent_id = parent_id;
  //   await theCompany.save();
  //   res.json({});
  // });

  // router.delete('/company/departments/:id', async (req, res) => {
  //   const { user } = req;
  //   const { company_id } = user;

  //   const theCompany = await Company.findById(company_id).exec();
  //   const theDeptIdx = theCompany.departments
  //     .findIndex(department => department._id.toString() === req.params.id);
  //   theCompany.departments.splice(theDeptIdx, 1);

  //   await theCompany.save();
  //   res.json({});
  // });
};

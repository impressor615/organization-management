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

    const theOrganization = await Organization.create({ name });
    const theUser = await User.findById(user._id).exec();
    const organization = theOrganization._id.toString();
    theUser.organizations = { organization, authority: AUTHORITY.admin };
    await theUser.save();

    res.json({ _id: organization });
  });

  // TODO: add filter, pagnation middlewares
  router.get('/organizations', async (req, res) => {
    const { user } = req;
    const { organizations } = await User.findById(user._id)
      .populate('organizations.organization', '_id name')
      .lean()
      .exec();

    res.json(organizations);
  });

  router.put('/organizations/:id', async (req, res) => {
    const { user, params, body } = req;
    const { name } = body;
    if (!name) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    const { organizations } = await User.findById(user._id).lean().exec();
    const theOrganization = organizations.find(org => org.organization.toString() === params.id);
    if (!theOrganization) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    if (theOrganization.authority !== AUTHORITY.admin) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    await Organization.findByIdAndUpdate(params.id, { name }).exec();
    res.json({});
  });

  router.delete('/organizations/:id', async (req, res) => {
    const { user, params } = req;
    const { organizations } = await User.findById(user._id).lean().exec();
    const update = {
      organizations: organizations.filter(org => org.organization.toString() !== params.id),
    };
    await User.findByIdAndUpdate(user._id, update);
    res.json({});
  });
};

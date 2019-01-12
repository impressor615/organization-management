const { Team, User } = require('../models')();
const { sendError } = require('../utils/routeUtils');
const { AUTHORITY } = require('../constants/models');

module.exports = (router) => {
  router.post('/user/teams', async (req, res) => {
    const { user, body } = req;
    const { name } = body;

    if (!name) {
      sendError({ res, language: req.language });
      return;
    }

    const theTeam = await Team.create({ name });
    const theUser = await User.findById(user._id).exec();
    const teamId = theTeam._id.toString();
    theUser.teams.push({ team: teamId, authority: AUTHORITY.admin });
    await theUser.save();

    res.json({ _id: teamId });
  });

  router.get('/user/teams', async (req, res) => {
    const { user } = req;
    const { teams } = await User.findById(user._id)
      .populate('teams.team', '_id name')
      .lean()
      .exec();

    res.json(teams);
  });

  router.put('/user/teams/:id', async (req, res) => {
    const { user, params, body } = req;
    const { name } = body;
    if (!name) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    const { teams } = await User.findById(user._id).lean().exec();
    const theTeam = teams.find(team => team.team.toString() === params.id);
    if (!theTeam) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    if (theTeam.authority !== AUTHORITY.admin) {
      sendError({ res, langauge: req.langauge });
      return;
    }

    await Team.findByIdAndUpdate(params.id, { name }).exec();
    res.json({});
  });

  router.delete('/user/teams/:id', async (req, res) => {
    const { user, params } = req;
    const { teams } = await User.findById(user._id).lean().exec();
    const update = {
      teams: teams.filter(team => team.team.toString() !== params.id),
    };
    await User.findByIdAndUpdate(user._id, update);
    res.json({});
  });
};

const chai = require('chai');


const {
  app,
  models,
  assertError,
  errors,
  constants,
} = chai;
const { User, Team } = models;
const { TEAM_SIZES } = constants;
describe('User Teams Router', () => {
  let accessToken;
  let orgId;
  before(async () => {
    await User.deleteMany();
    await Team.deleteMany();

    const registerResponse = await chai.request(app)
      .post('/api/register')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
      });

    registerResponse.body.should.include.keys(['_id']);

    const loginResponse = await chai.request(app)
      .post('/api/login')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
      });

    accessToken = loginResponse.body.access_token;
    loginResponse.body.should.include.keys(['access_token']);
  });

  after(async () => {
    await User.deleteMany();
    await Team.deleteMany();
  });

  describe('POST /api/user/teams', () => {
    it('should return orgazation id', async () => {
      const res = await chai.request(app)
        .post('/api/user/teams')
        .set('x-access-token', accessToken)
        .send({ name: 'orgchart', size: TEAM_SIZES.tiny });

      res.body.should.include.keys(['_id']);
      orgId = res.body._id;
    });

    it('should return invalid_route_data when there is no request body ', async () => {
      const res = await chai.request(app)
        .post('/api/user/teams')
        .set('x-access-token', accessToken);

      assertError(res.error.text, errors.route_invalid_data);
    });
  });

  describe('GET /api/user/teams', () => {
    it('should return users\' teams', async () => {
      const res = await chai.request(app)
        .get('/api/user/teams')
        .set('x-access-token', accessToken);

      res.status.should.equal(200);
      res.body.should.lengthOf(1);
      res.body.forEach((org) => {
        org.should.include.keys(['team', 'authority']);
      });
    });
  });

  describe('PUT /api/user/teams/:id', () => {
    it('should update the teams info', async () => {
      const update = { name: 'orgchart1' };
      const res = await chai.request(app)
        .put(`/api/user/teams/${orgId}`)
        .set('x-access-token', accessToken)
        .send(update);

      res.status.should.equal(200);

      const getRes = await chai.request(app)
        .get('/api/user/teams')
        .set('x-access-token', accessToken);

      getRes.body.should.lengthOf(1);
      getRes.body[0].team.name.should.equal(update.name);
    });

    it('should return invalid data when update is not provided', async () => {
      const res = await chai.request(app)
        .put('/api/user/teams/fakeId')
        .set('x-access-token', accessToken);

      assertError(res.error.text, errors.route_invalid_data);
    });

    it('should return invalid data when the user don\'t belong to the org', async () => {
      const update = { name: 'orgchart1' };
      const res = await chai.request(app)
        .put('/api/user/teams/fakeId')
        .set('x-access-token', accessToken)
        .send(update);

      assertError(res.error.text, errors.route_invalid_data);
    });
  });

  describe('DELETE /api/user/teams/:id', () => {
    it('should delete the organization', async () => {
      const res = await chai.request(app)
        .delete(`/api/user/teams/${orgId}`)
        .set('x-access-token', accessToken);

      res.status.should.equal(200);
      res.body.should.empty;

      const getRes = await chai.request(app)
        .get('/api/user/teams')
        .set('x-access-token', accessToken);

      getRes.body.should.lengthOf(0);
    });
  });
});

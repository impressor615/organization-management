const chai = require('chai');

const {
  app,
  models,
  assertError,
  errors,
} = chai;
const { User } = models;
describe('Register Router', () => {
  let accessToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/register')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
      });

    res.body.should.include.keys(['_id']);
  });

  after(async () => {
    await User.deleteMany();
  });

  describe('GET /api/register', () => {
    it('should verify user', async () => {
      const res = await chai.request(app)
        .post('/api/login')
        .send({
          email: 'admin@orgchart.com',
          password: '1234',
        });

      accessToken = res.body.access_token;
      res.body.should.include.keys(['access_token']);
    });

    it('should return invalid_route_data when there is no user', async () => {
      const res = await chai.request(app).post('/api/login');
      assertError(res.error.text, errors.route_invalid_data);
    });

    it('should return not_authorized when password is not correct', async () => {
      const res = await chai.request(app)
        .post('/api/login')
        .send({
          email: 'admin@orgchart.com',
          password: '4321',
        });
      assertError(res.error.text, errors.not_authorized);
    });
  });

  describe('all /api', () => {
    it('should return not_authorized when there is no token', async () => {
      const res = await chai.request(app).get('/api/dashboards');
      assertError(res.error.text, errors.not_authorized);
    });

    it('should return not_authorized when token is invalid', async () => {
      const res = await chai.request(app)
        .get('/api/nothing')
        .set('x-access-token', 'fakeToken');

      assertError(res.error.text, errors.not_authorized);
    });

    it('should return not_authorized when token is invalid', async () => {
      const res = await chai.request(app)
        .get('/api/nothing')
        .set('x-access-token', accessToken);

      res.error.status.should.be.equal(404);
    });
  });
});

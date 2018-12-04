const chai = require('chai');

const {
  app,
  models,
  assertError,
  errors,
} = chai;
const { User } = models;
describe('Register Router', () => {
  after(async () => {
    await User.deleteMany();
  });

  describe('GET /api/register', () => {
    it('should create user', async () => {
      const res = await chai.request(app)
        .post('/api/register')
        .send({
          email: 'admin@orgchart.com',
          password: '1234',
        });

      res.body.should.include.keys(['_id']);
    });

    it('should return route_invalid_data when body data is not enought', async () => {
      const res = await chai.request(app).post('/api/register');
      assertError(res.error.text, errors.route_invalid_data);
    });
  });
});

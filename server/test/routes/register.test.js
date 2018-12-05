const chai = require('chai');

const {
  app,
  models,
  assertError,
  errors,
} = chai;
const { User, Company } = models;
describe('Register Router', () => {
  after(async () => {
    await User.deleteMany();
    await Company.deleteMany();
  });

  describe('GET /api/register', () => {
    it('should create user', async () => {
      const res = await chai.request(app)
        .post('/api/register')
        .send({
          email: 'admin@orgchart.com',
          password: '1234',
          company_name: 'orgchart',
        });

      res.body.should.include.keys(['_id']);
    });

    it('should return route_invalid_data when body data is not enough', async () => {
      const res = await chai.request(app).post('/api/register');
      assertError(res.error.text, errors.route_invalid_data);
    });
  });
});

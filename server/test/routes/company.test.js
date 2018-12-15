const chai = require('chai');

const {
  app,
  models,
  assertError,
  errors,
} = chai;
const { User, Company, Department } = models;
describe('Company Router', () => {
  let accessToken;
  let departmentId;
  before(async () => {
    const registerResponse = await chai.request(app)
      .post('/api/register')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
        company_name: 'org-chart',
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
    await Company.deleteMany();
    await Department.deleteMany();
  });

  describe('GET /api/company', () => {
    it('should return the company\'s information', async () => {
      const res = await chai.request(app)
        .get('/api/company')
        .set('x-access-token', accessToken);

      res.body.should.include.keys(['_id', 'name', 'created_at', 'updated_at']);
    });
  });

  describe('POST /api/company/departments', () => {
    it('return route_invalid_data when there is no required field', async () => {
      const res = await chai.request(app)
        .post('/api/company/departments')
        .set('x-access-token', accessToken);

      assertError(res.error.text, errors.route_invalid_data);
    });

    it('should create department', async () => {
      const res = await chai.request(app)
        .post('/api/company/departments')
        .set('x-access-token', accessToken)
        .send({ name: 'department1' });

      departmentId = res.body._id;
      res.body.should.include.keys(['_id']);
    });
  });

  describe('GET /api/company/departments', () => {
    it('should return the company\'s departments', async () => {
      const res = await chai.request(app)
        .get('/api/company/departments')
        .set('x-access-token', accessToken);

      res.body.forEach((department) => {
        department.should.include.keys(['_id', 'name', 'created_at', 'updated_at']);
      });
    });
  });

  describe('PUT /api/company/departments/:id', () => {
    it('return route_invalid_data when there is no required field', async () => {
      const res = await chai.request(app)
        .put(`/api/company/departments/${departmentId}`)
        .set('x-access-token', accessToken);

      assertError(res.error.text, errors.route_invalid_data);
    });

    it('should update department', async () => {
      const res = await chai.request(app)
        .put(`/api/company/departments/${departmentId}`)
        .set('x-access-token', accessToken)
        .send({ name: 'department2' });

      res.body.should.be.empty;
    });
  });

  describe('DELETE /api/company/departments/:id', () => {
    it('should delete department', async () => {
      const res = await chai.request(app)
        .delete(`/api/company/departments/${departmentId}`)
        .set('x-access-token', accessToken);

      res.body.should.be.empty;
    });
  });
});

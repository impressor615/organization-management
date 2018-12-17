const chai = require('chai');

const {
  app,
  models,
  assertError,
  errors,
} = chai;
const { User, Company, Department } = models;
describe('User Router', () => {
  let accessToken;
  let departmentId;
  let userId;

  before(async () => {
    const registerResponse = await chai.request(app)
      .post('/api/register')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
        company_name: 'org-chart',
      });

    userId = registerResponse.body._id;
    registerResponse.body.should.include.keys(['_id']);

    const loginResponse = await chai.request(app)
      .post('/api/login')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
      });

    accessToken = loginResponse.body.access_token;
    loginResponse.body.should.include.keys(['access_token']);

    const departmentResponse = await chai.request(app)
      .post('/api/company/departments')
      .set('x-access-token', accessToken)
      .send({ name: 'department1' });

    departmentId = departmentResponse.body._id;
    departmentResponse.body.should.include.keys(['_id']);
  });

  after(async () => {
    await User.deleteMany();
    await Company.deleteMany();
    await Department.deleteMany();
  });

  describe('POST /api/users', () => {
    it('should return route_invalid_data when there is no department_id', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          email: 'member@orgchart.com',
          name: 'seonghyeon kim',
          phone: '01012341234',
          position: '매니저',
        });

      assertError(res.error.text, errors.route_invalid_data);
    });

    it('should create user in the specific department', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .set('x-access-token', accessToken)
        .send({
          email: 'member@orgchart.com',
          department_id: departmentId,
          name: 'seonghyeon kim',
          phone: '01012341234',
          position: '매니저',
        });

      res.body.should.include.keys(['_id']);
    });
  });

  describe('GET /api/users', () => {
    it('should return users list beloing to the department', async () => {
      const res = await chai.request(app)
        .get(`/api/users?dept_ids[0]=${departmentId}`)
        .set('x-access-token', accessToken);

      res.body.forEach((user) => {
        user.should.include.keys([
          '_id',
          'email',
          'department_id',
          'name',
          'phone',
          'position',
        ]);
      });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user info', async () => {
      const res = await chai.request(app)
        .put(`/api/users/${userId}`)
        .set('x-access-token', accessToken)
        .send({
          email: 'member2@orgchart.com',
          department_id: departmentId,
          name: 'seonghyeon kim2',
          phone: '01012341234',
          position: '매니저',
        });

      res.body.should.be.empty;
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should update user info', async () => {
      const res = await chai.request(app)
        .delete(`/api/users/${userId}`)
        .set('x-access-token', accessToken);

      res.body.should.be.empty;
    });
  });
});

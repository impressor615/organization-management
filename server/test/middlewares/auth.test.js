const chai = require('chai');
const spies = require('chai-spies');
const auth = require('../../middlewares/auth');

chai.use(spies);
const {
  app,
  errors,
  models,
} = chai;
const { User } = models;
describe('middleware auth', () => {
  let accessToken;

  before(async () => {
    const registerResponse = await chai.request(app)
      .post('/api/register')
      .send({
        email: 'admin@orgchart.com',
        password: '1234',
        company_name: 'oc-chart',
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
  });

  it('should return not_authorized when there is no token', async () => {
    const json = chai.spy(() => (
      { type: 'error', message: errors.not_authorized }
    ));
    const status = chai.spy(() => ({ json }));
    const mockReq = { app, headers: {}, query: {} };
    const mockRes = { status, json };
    const mockNext = chai.spy(() => {});

    await auth(mockReq, mockRes, mockNext);
    status.should.have.been.called();
    json.should.have.been.called();
  });

  it('should return not_authorized when token is invalid', async () => {
    const json = chai.spy(() => (
      { type: 'error', message: errors.not_authorized }
    ));
    const status = chai.spy(() => ({ json }));
    const mockReq = { app, headers: {}, query: {} };
    const mockRes = { status, json };
    const mockNext = chai.spy(() => {});

    mockReq.headers['x-access-token'] = 'fakeToken';
    await auth(mockReq, mockRes, mockNext);
    status.should.have.been.called();
    json.should.have.been.called();
  });

  it('should add user property to mockRequest object', async () => {
    const json = chai.spy(() => (
      { type: 'error', message: errors.not_authorized }
    ));
    const status = chai.spy(() => ({ json }));
    const mockReq = { app, headers: {}, query: {} };
    const mockRes = { status, json };
    const mockNext = chai.spy(() => {});

    mockReq.headers['x-access-token'] = accessToken;
    await auth(mockReq, mockRes, mockNext);
    mockReq.should.includes.keys(['user']);
  });
});

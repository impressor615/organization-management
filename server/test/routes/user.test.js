const chai = require('chai');

const {
  app,
} = chai;
describe('User Router', () => {
  describe('GET /api/users', () => {
    it('should return Hello World', async () => {
      const res = await chai.request(app).get('/api/users');
      res.status.should.be.equal(200);
      res.text.should.be.equal('Hello World');
    });
  });
});

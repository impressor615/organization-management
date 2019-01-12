const chai = require('chai');
const spies = require('chai-spies');
const pagination = require('../../middlewares/pagination');


chai.use(spies);
describe('middleware pagination', () => {
  const res = {};
  const next = chai.spy(() => {});
  it('should return default count, page, skip query', () => {
    const req = { method: 'GET', query: {} };
    pagination(req, res, next);
    req.query.should.includes.keys(['count', 'page', 'skip']);
    next.should.have.been.called();
  });

  it('should return empty query when method is not GET', () => {
    const req = { method: 'POST', query: {} };
    pagination(req, res, next);
    req.query.should.empty;
    next.should.have.been.called();
  });

  it('should return current query if page and count is provided', () => {
    const req = { method: 'GET', query: { count: 20, page: 5 } };
    pagination(req, res, next);
    req.query.should.includes.keys(['count', 'page', 'skip']);
    req.query.page.should.equal(req.query.page);
    req.query.count.should.equal(req.query.count);

    next.should.have.been.called();
  });
});

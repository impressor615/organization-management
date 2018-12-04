const chai = require('chai');
const spies = require('chai-spies');
const parseLanguage = require('../../middlewares/parseLanguage');


chai.use(spies);
describe('middleware parseLangauge', () => {
  const req = { acceptsLanguages: chai.spy(() => []) };
  const res = {};
  const next = chai.spy(() => {});
  it('should add landuage to request', () => {
    parseLanguage(req, res, next);
    req.should.includes.keys(['language']);
    next.should.have.been.called();
  });
});

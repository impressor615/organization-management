const chai = require('chai');
const spies = require('chai-spies');
const { sendError } = require('../../utils/routeUtils');

const {
  errors,
} = chai;

chai.use(spies);
describe('routeUtils', () => {
  const json = chai.spy(() => (
    { type: 'error', message: errors.route_invalid_data }
  ));
  const status = chai.spy(() => ({ json }));
  const res = { status, json };
  it('should return type and message', () => {
    const result = sendError({ res, language: 'en' });
    result.should.includes.keys(['type', 'message']);
    res.status.should.have.been.called();
    res.json.should.have.been.called();
  });
});

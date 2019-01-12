const DEFAULT_COUNT = 20;
const DEFAULT_PAGE = 1;
const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
module.exports = (req, res, next) => {
  const { method } = req;
  if (method !== METHOD.GET) {
    next();
    return;
  }
  const { query } = req;
  const { count, page } = query;
  query.count = count || DEFAULT_COUNT;
  query.page = page || DEFAULT_PAGE;
  query.skip = query.count * (query.page - 1);

  next();
};

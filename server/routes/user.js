module.exports = (router) => {
  router.get('/', async (req, res) => {
    const result = 'Hello World';
    return res.send(result);
  });
};

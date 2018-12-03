/* eslint-disable */
const fs = require('fs');

module.exports = (router) => {
  const publicRoutes = ['user.js'];
  publicRoutes.forEach(route => (
    require(`./${route}`)(router)
  ));

  const routes = fs.readdirSync(__dirname);
  routes.forEach((route) => {
    if (route === 'index.js') {
      return;
    }

    if (!/.js$/.test(route)) {
      return;
    }

    if (publicRoutes.includes(route)) {
      return;
    }

    require(`./${route}`)(router);
    return;
  });

  return  router;
};

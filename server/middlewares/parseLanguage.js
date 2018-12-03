module.exports = (req, res, next) => {
  const languages = req.acceptsLanguages();
  req.language = languages ? languages[0] : 'en';
  next();
};

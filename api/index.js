module.exports = function (app) {
  app.use('/api/street', require('./street'))
  app.use('/api/common', require('./common'))
}

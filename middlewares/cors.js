module.exports = function (open) {
  if (open) {
    return function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
      )
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      /*让options预检请求快速返回*/
      if (req.method == 'OPTIONS') {
        res.send(200)
      } else {
        next()
      }
    }
  } else {
    return function (req, res, next) {
      // do nothing
      next()
    }
  }
}

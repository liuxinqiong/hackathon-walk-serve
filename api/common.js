var express = require('express')
var router = express.Router()
var path = require('path')

router.post('/upload', function (req, res, next) {
  var result = []
  for (attr in req.files) {
    result.push({
      name: req.files[attr].name,
      path: '/img/' + req.files[attr].path.split(path.sep).pop(),
    })
  }
  res.json({
    code: 'success',
    data: result,
  })
})

module.exports = router

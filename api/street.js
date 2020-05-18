var express = require('express')
var router = express.Router()
var StreetModel = require('../models/street')

router.get('/test', function (req, res, next) {
  res.json({
    message: '123',
  })
})

router.post('/add', function (req, res, next) {
  StreetModel.create({
    name: '设计公社',
    coordinates: [
      [22.575004, 113.941956],
      [22.575103, 113.942792],
      [22.575083, 113.94408],
      [22.573973, 113.944037],
      [22.572368, 113.944058],
      [22.571417, 113.944209],
    ],
    tags: ['商业', '办公', '绿化'],
    desc: [
      {
        score: 3.5,
        desc: '这里非常好看',
      },
      {
        score: 4,
        desc: '这里非常好看2',
      },
    ],
    pics: [
      {
        coordinate: [22.573973, 113.944037],
        url: 'https://blog.pig1024.me/asset/dog/0.png',
        desc: '这是一条狗',
      },
    ],
  }).then((data) => {
    res.json({
      message: 'success',
    })
  })
})

router.get('/query', function (req, res, next) {
  StreetModel.query().then((data) => {
    res.json({
      message: 'success',
      data,
    })
  })
})

router.get('/queryById', function (req, res, next) {
  const id = req.query.id
  StreetModel.queryById(id).then((data) => {
    console.log(data)
    res.json({
      message: 'success',
      data,
    })
  })
})

router.post('/add/pic', function (req, res, next) {
  const { id, pic } = req.fields
  StreetModel.addPic(id, pic).then((data) => {
    res.json({
      message: 'success',
      data,
    })
  })
})

router.post('/add/desc', function (req, res, next) {
  const { id, desc } = req.fields
  StreetModel.addDesc(id, desc).then((data) => {
    res.json({
      message: 'success',
      data,
    })
  })
})

module.exports = router

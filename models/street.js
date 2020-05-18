var Street = require('../lib/mongo').Street
var Mongolass = require('mongolass')

var ObjectID = Mongolass.ObjectID

function addHostName(url) {
  var hostName = 'http://192.168.0.2:8899'
  if (url.indexOf('/img/upload_') === 0) {
    return hostName + url
  }
  return url
}

Street.plugin('addHostNameForPicUrl', {
  afterFind: function (streets) {
    return Promise.all(
      streets.map(function (street) {
        street.pics = street.pics.map((pic) => {
          pic.url = addHostName(pic.url)
          return pic
        })
        return street
      })
    )
  },
  afterFindOne: function (street) {
    if (street) {
      street.pics = street.pics.map((pic) => {
        pic.url = addHostName(pic.url)
        return pic
      })
      return street
    }
    return street
  },
})

module.exports = {
  create: function (street) {
    return Street.create(street).exec()
  },
  query: function (params) {
    return Street.find().addCreatedAt().addHostNameForPicUrl().exec()
  },
  queryById: function (id) {
    return Street.findOne({ _id: ObjectID(id) })
      .addHostNameForPicUrl()
      .exec()
  },
  addPic: function (id, picItem) {
    return Street.findOne({ _id: ObjectID(id) })
      .exec()
      .then((street) => {
        const pics = street.pics
        const newPics = [...pics, picItem]
        return Street.update({ _id: ObjectID(id) }, { $set: { pics: newPics } })
      })
  },
  addDesc: function (id, descItem) {
    return Street.findOne({ _id: ObjectID(id) })
      .exec()
      .then((street) => {
        const desc = street.desc
        const newDesc = [...desc, descItem]
        return Street.update({ _id: ObjectID(id) }, { $set: { desc: newDesc } })
      })
  },
}

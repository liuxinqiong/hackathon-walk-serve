var path = require('path')
var express = require('express')
var http = require('http')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var config = require('config-lite')(__dirname)
var cookieParser = require('cookie-parser')
var api = require('./api')
var cors = require('./middlewares/cors')

var app = express()

var server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser())

app.use(
  session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
      maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({
      // 将 session 存储到 mongodb
      url: config.mongodb, // mongodb 地址
    }),
  })
)

// 处理表单及文件上传的中间件,本质使用 formidable，进行了简单中间件处理
app.use(
  require('./middlewares/express-formidable')({
    uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
    keepExtensions: true, // 保留后缀
  })
)

app.use(cors(true))

api(app)

app.use(function (err, req, res, next) {
  res.json({
    message: 'Server Error',
  })
})

function startServer() {
  server.listen(config.port, function () {
    console.log(
      `serve started in ${app.get('env')} mode on port ${config.port}`
    )
  })
}

startServer()

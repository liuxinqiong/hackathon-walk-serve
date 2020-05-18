module.exports = {
  port: 8899,
  session: {
    secret: 'hackathon',
    key: 'hackathon',
    maxAge: 2592000000,
  },
  mongodb: 'mongodb://localhost:27017/hackathon',
}

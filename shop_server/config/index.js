module.exports = {
  // 端口号
  port: 6060,
  secret: 'shadouyou',
  pass: [ '/users/login' ],
  // cookie 过期时间
  expires: 60 * 60 * 24 * 7 * 1000,
  proxies: [
    {
      "source": "/editMyInfo",
      "target": "http://localhost:8080/person/editMyInfo"
    }
  ]
}

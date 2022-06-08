module.exports = {
  // 端口号
  port: 8080,
  // token 秘钥
  secret: 'guoxiang',
  // token 不验证的地址
  pass: [ '/users/login', /^\/person\/editMyInfo\/.*/ ],
  // token 过期时间
  expires: 60 * 60 * 24 * 7
}

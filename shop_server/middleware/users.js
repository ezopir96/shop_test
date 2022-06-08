// routes/users.js 使用的中间件

// 用户登录
const testLogin = (req, res, next) => {
  // 1. 拿到用户传递来的 参数
  const { username, password } = req.body

  // 2. 非空验证(保证前端必须要传递了这个参数)
  if (!username || !password) return next(4)

  // 3. 参数的格式验证(正则验证)
  // 暂时简单验证一个长度, 将来学完了正则, 你们自己回来补上
  if (username.length < 5 || username.length > 12 || password.length < 5 || password.length > 12) return next(5)

  next()
}

module.exports = {
  testLogin
}

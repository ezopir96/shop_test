// routes/users 内使用的中间件

// 验证登录
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

// 验证 id
const testId = (req, res, next) => {
  // 拿到前端传递来的 id
  const id = req.params.id || req.body.id

  // 判断不符合规则
  if (id.length !== 24) return next(5)

  next()
}


module.exports = {
  testLogin,
  testId
}


/*
  当你在中间件中执行代码
    next()
      => 去到下一个中间件的时候没有携带参数
      => 下一个中间件的参数
        -> 第一个 req 请求相关内容
        -> 第二个 res 响应相关内容
        -> 第三个 next 去到下一步的回调函数
    next(xxx)
      => 去到下一个中间的时候携带了参数
      => 下一个中间键的参数
        -> 第一个 xxx 上一个 next 传递过来的参数
        -> 第二个 req 请求相关内容
        -> 第三个 res 响应相关内容
        -> 第四个 next 去到下一步的回调函数
*/

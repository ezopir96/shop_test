// 全局空路由
const empty = (req, res) => {
  res.status(404).send({
    code: 404,
    message: '你请求的路径地址不存在, 有可能是地址错了, 有可能是请求方式错了',
    tips: {
      url: req.url,
      method: req.method
    }
  })
}

// 记录每一次访问信息
const info = (req, res, next) => {
  console.log(
    `
      当前服务器接收到了一个请求
        时间: ${ new Date() }
        请求方式: ${ req.method }
        请求地址: ${ req.url }
        请求 query: ${ JSON.stringify(req.query) }
        请求 params: ${ JSON.stringify(req.params) }
        请求 body: ${ JSON.stringify(req.body) }
    `
  )

  next()
}

// 全局错误处理
const error = (err, req, res, next) => {
  // 错误编码4, 参数不全
  if (err === 4) return res.send({
    code: 4,
    message: '你应该传递的参数不全, 请查证后再试',
    query: req.query,
    params: req.params,
    body: req.body
  })

  // 错误编码5, 参数不符合格式
  if (err === 5) return res.send({
    code: 5,
    message: '你传递的参数不符合要求, 请查证后再试',
    query: req.query,
    params: req.params,
    body: req.body
  })
}

module.exports = {
  empty,
  error,
  info
}

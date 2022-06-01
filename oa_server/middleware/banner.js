// routes/banner.js 使用的中间件

const testAdd = (req, res, next) => {
  // 验证 title 必填
  // 验证 link 可有可无
  // 图片地址(哪里来的) ?
  // 1. 拿到各种信息
  const { title, link } = req.body
  const img_url = '/public/banner/' + req.file.filename

  // 2. 验证参数
  if (!title) return next(4)

  // 3. 格式验证
  // 正则验证 link 的 url 格式正确

  // 4. 为了后续路由处理函数使用方便
  // 把 img_url 也添加到 body 内
  req.body.img_url = img_url

  next()
}

module.exports = {
  testAdd
}

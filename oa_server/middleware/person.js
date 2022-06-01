// routes/person.js 使用的中间件

// 获取用户列表
const testList = (req, res, next) => {
  // 参数验证
  // 1. 获取参数
  const { current, pagesize, is_status, gender, search } = req.query

  // 2. 参数验证
  if (!(current === undefined || !isNaN(current))) return next(5)
  if (!(pagesize === undefined || !isNaN(pagesize))) return next(5)
  if (!(is_status === undefined || is_status === 'all' || is_status - 0 === 1 || is_status - 0 === 0)) return next(5)
  if (!(gender === undefined || gender === 'all' || gender === '保密' || gender === '男' || gender === '女')) return next(5)

  // 3. 把没传递的参数给一个默认值
  if (current === undefined) req.query.current = 1
  if (pagesize === undefined) req.query.pagesize = 5
  if (is_status === undefined) req.query.is_status = 'all'
  if (gender === undefined) req.query.gender = 'all'
  if (search === undefined) req.query.search = ''

  next()
}

// 修改用户状态
const testStatus = (req, res, next) => {
  // 1. 拿到两个参数
  const { id, status } = req.body

  // 2. 验证参数
  if (id.length !== 24) return next(5)
  if (!(status === '1' || status === '0')) return next(5)

  next()
}


module.exports = {
  testList,
  testStatus
}

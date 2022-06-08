// routes/pages.js 文件专用的中间件
// 导入数据库操作模型
const { BannerModel, PersonModel } = require('../db/model')
// 1. 处理获取轮播图列表的逻辑
const getBannerList = async (req, res, next) => {

  console.log('我是bannerList 中间件')
  // 因为我们需要 oa 后台管理系统来管理我们的 轮播图
  // oa 管理的数据库就是我要访问的数据库
  // 我需要访问和 oa 管理的一样的数据库位置
  // 1-1. 读取轮播图列表
  const result = await BannerModel.find()

  // 1-2. 是需要把读取出来的数据, 放在后面的路由处理函数内使用
  // 所以我们只需要挂载在指定位置
  req.banner = result

  console.log(req.banner)
  next()
}

// 2. 判断是否有用户信息
const getUserInfo = async (req, res, next) => {
  console.log('我是userList 中间件, req.session = ', req.session)
  // 拿到 session 空间内是否有信息
  const { info } = req.session
  console.log('session 信息 + ', info)

  if (!info) return next()

  // 拿到用户 nickname
  const { nickname } = info

  // 存储到 req 身上
  req.nickname = nickname

  console.log('nickname = ', req.nickname)
  next()
}

const getMyInfo = async (req, res, next) => {
  const { info } = req.session
  console.log('myinfo session = ', info)

  if (!info) return next()

  const { id } = info
  console.log('getMyInfo = ', id)

  const result = await PersonModel.findById({ _id: id })
  console.log(result)
  req.result = result
  next()
}

// 导出
module.exports = {
  getBannerList,
  getUserInfo,
  getMyInfo
}

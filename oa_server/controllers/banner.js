// routes/banner.js 使用的路由处理函数

// 导入数据库操作模型
const { BannerModel } = require('../db/model')

// 获取轮播图列表
const list = async (req, res) => {
  // 获取所有轮播图内容, 把内容返回给前端
  const result = await BannerModel.find()

  // 对数据进行一些处理
  const list = []
  result.forEach(item => {
    list.push({
      title: item.title,
      img_url: item.img_url,
      link: item.link,
      id: item._id,
      createTime: new Date(item.createTime).getTime()
    })
  })

  // 把结果返回给前端
  res.send({
    code: 1,
    message: '获取轮播图列表成功',
    list
  })
}

// 增加一张轮播图
const add = async (req, res) => {
  // 1. 直接拿到参数即可
  const { title, link, img_url } = req.body

  console.log(req.body)
  // 2. 向数据库中添加
  // 2-1. 检测数据库中有多少个图片信息(要求最多9个)
  const total = (await BannerModel.find()).length
  if (total >= 9) return res.send({ code: 0, message: '添加失败, 轮播图数量已到达上限' })

  // 2-2. 插入到数据库中一条新的信息
  const result = await BannerModel({ title, link, img_url }).save()

  if (result) res.send({ code: 1, message: '添加图片成功' })
}

// 删除一张轮播图
const remove = async (req, res) => {
  // 1. 拿到 id
  const { id } = req.params

  // 2. 拿到当前轮播图的总数
  const total = (await BannerModel.find()).length
  if (total <= 3) return res.send({ code: 0, message: '轮播图删除失败, 数量已经抵达下限' })

  // 3. 执行删除操作
  await BannerModel.findByIdAndDelete(id)

  // 4. 返回给前端结果
  res.send({ code: 1, message: '删除成功' })
}

// 获取一条信息
const info = async (req, res) => {
  // 1. 拿到 id 信息
  const { id } = req.params

  // 2. 根据 id 获取信息
  const result = await await BannerModel.findById(id)

  // 3. 返回给前端信息
  res.send({
    code: 1,
    message: '获取轮播图信息成功',
    info: {
      id: result._id,
      img_url: result.img_url,
      title: result.title,
      link: result.link
    }
  })
}

// 修改一条轮播图信息
const update = async (req, res) => {
  // 1. 获取到信息
  const { id, title, link, img_url } = req.body

  // 2. 操作数据库修改信息
  await BannerModel.findByIdAndUpdate(id, { title, link, img_url })

  // 3. 返回给前端信息
  res.send({ code: 1, message: '修改成功了' })
}

module.exports = {
  list,
  add,
  remove,
  info,
  update
}

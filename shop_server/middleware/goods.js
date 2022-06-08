const { GoodsModel, PersonModel } = require('../db/model')

const getGoodsList = async (req, res, next) => {
  console.log('这里是 goodsList 中间件')
  const { info, cur } = req.params
  let current = cur ? cur - 0 : 1
  console.log('current = ', current, '| info = ', info)
  if (info === 'next') current++
  if (info === 'prev') current--
  console.log(typeof info !== 'undefined' && info !== 'next' && info !== 'prev')
  if ( typeof info !== 'undefined' && info !== 'next' && info !== 'prev') current = info - 0
  const pagesize = req.pagesize ? req.pagesize : 12
  const start = (current - 1) * pagesize
  console.log('current = ', current, '| info = ', info)
  const result = await GoodsModel.find({}).skip(start).limit(pagesize)
  // 获取总数
  // const total = (await GoodsModel.find({})).length
  const total = 35505
  const totalPage = Math.ceil(total / pagesize)
  console.log('total = ', total, 'totalPage = ', totalPage)

  const list = []

  result.forEach(item => {
    list.push({
      id: item._id,
      title: item.title,
      price: item.price,
      link: item.link,
      category: item.category
    })
  })

  req.goodsList = { goodsInfo: list, current: current, pagesize: pagesize, total: total, totalPage: totalPage }
  next()
}

module.exports = {
  getGoodsList
}
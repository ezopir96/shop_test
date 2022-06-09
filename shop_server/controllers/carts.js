const { CartsModel } = require('../db/model')


// 备注: 出于性能, 认为每次加减需要重新查询数据库渲染页面, 试试加减操作不再渲染, 只根据返回成功与否在前端操作
const addGoods = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const { goodsID, number } = req.params

  if (number <0) return res.send({ code: 0, message: '商品数量不能小于 0 !' })

  const goodsResult = await CartsModel.findOneAndUpdate({
    "user": id,
    "goods": goodsID
  }, {
    "number": number
  })
  .then((result, err) => {
    if (err) return send({ code: 0, message: '修改失败' })
  })

  console.log('success')
  res.send({
    code: 1,
    message: '修改成功',
    info: goodsResult
  })
}



module.exports = {
  addGoods
}
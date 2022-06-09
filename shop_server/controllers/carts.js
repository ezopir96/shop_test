const { CartsModel, GoodsModel } = require('../db/model')


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

// 商品页面加入购物车
const addCarts = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const goodsID = req.params.goodsID.replace(/\"/g,"")

  const cartsResult = await CartsModel.find({
    "user": id,
    "goods": goodsID
  })

  console.log('cartsResult = ', cartsResult, goodsID)
  if (cartsResult.length !== 0) {
    console.log('cartsResult = ', cartsResult[0].number, '\n')
    await CartsModel.findOneAndUpdate({
      "user": id,
      "goods": goodsID
    }, {
      "number": (parseInt(cartsResult[0].number) + 1)
    })
  } else {
    const goodsInfo = await GoodsModel.findById({ _id: goodsID })
    new CartsModel({
      user: id,
      goods: goodsID,
      number: 1,
      price: goodsInfo.price
    }).save()
    console.log('goodsInfo', goodsInfo)
  }

  res.send({
    code: 0,
    message: '添加购物车成功'
  })
}

const changeStat = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const { stat, goodsID } = req.body

  console.log('stat = ', stat, 'goodsID = ', goodsID)

  const changeResult = await CartsModel.findOneAndUpdate({
    "user": id,
    "goods": goodsID
  }, {
    "is_selected": stat
  })

  if (!changeResult) return res.send({ code: 0, message: '修改失败!' })

  res.send({
    code: 1,
    message: '成功了',
    info: { stat, goodsID }
  })
}

//返回根据计算数据库信息获得的总价钱
const totalPrice = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const cartsResult = await CartsModel.find({
    "user": id
  })
  if (!cartsResult) return res.send({ code: 2, message: '当前没有商品' })

  let totalPrice = 0
  cartsResult.forEach((item, index) => {
    if (item.is_selected === true) totalPrice += item.number * parseFloat(item.price)
  })

  res.send({
    code: 1,
    message: '获取总价成功',
    data: {
      totalPrice
    }
  })
}

const changeAll = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const { stat } = req.body

  const cartsResult = await CartsModel.update({
    "user": id
  }, {
    "is_selected": stat
  })


  if (!cartsResult) return res.send({ code: 0, message: '当前没有数据内容' })

  res.send({
    code: 1,
    message: '修改状态成功',
    info: {
      stat: stat
    }
  })
}

const deleteGoods = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const { goodsID } = req.params

  console.log('goodsID', goodsID)
  const deleteResult = await CartsModel.findOneAndRemove({
    "user": id,
    "goods": goodsID
  })

  if (!deleteResult) res.send({ code: 0, message: '删除失败' })

  res.send({
    code: 1,
    message: '删除成功',
    info: deleteResult
  })

}

const deleteAll = async (req, res) => {
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') return res.send({ code: 0, message: '还没有登录, 请先登录!' })

  const deleteResult = await CartsModel.remove({
    "user": id
  })

  if (!deleteResult) res.send({ code: 0, message: '删除失败' })

  res.send({
    code: 0,
    message: '删除成功',
    info: deleteResult
  })
}

module.exports = {
  addGoods,
  addCarts,
  changeStat,
  totalPrice,
  changeAll,
  deleteGoods,
  deleteAll
}
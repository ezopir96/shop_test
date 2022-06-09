const { CartsModel, GoodsModel } = require('../db/model')

const getCartsList = async (req, res, next) => {
  console.log('这里是 购物车 中间件')
  console.log(req.session.info)
  req.goodsList = []
  const { id } = req.session.info ? req.session.info : 'undefined'

  console.log('id = ', id)
  if (typeof id === 'undefined') next()

  const goodsResult = await CartsModel.find({
    user: id
  })

  console.log('goodsResult', goodsResult)
  if (goodsResult.length === 0) next()
  goodsResult.forEach(async (item, index) => {
    await GoodsModel.findById({ _id: item.goods })
      .then((result, err) => {
        req.goodsList.push({
          goods: item.goods,
          title: result.title,
          link: result.link,
          number: item.number,
          price: result.price,
          is_selected: item.is_selected
        })
      }).then(() => {
        console.log('req.goodsList m= ', req.goodsList)
        if (req.goodsList.length === goodsResult.length) {
          console.log(' OK ')
          next()
        }
      })
  })

}


module.exports = {
  getCartsList
}
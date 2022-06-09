const router = require('express').Router()
const { addGoods, addCarts, changeStat, totalPrice, changeAll, deleteGoods, deleteAll } = require('../controllers/carts')

router.get('/addGoods/:goodsID/:number', addGoods)
router.get('/addCarts/:goodsID', addCarts)

router.post('/changeStat', changeStat)

router.get('/totalPrice', totalPrice)
router.post('/changeAll', changeAll)

router.get('/delete/:goodsID', deleteGoods)
router.get('/deleteAll', deleteAll)

module.exports = router
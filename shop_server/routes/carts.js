const router = require('express').Router()
const { addGoods } = require('../controllers/carts')

router.get('/addGoods/:goodsID/:number', addGoods)

module.exports = router
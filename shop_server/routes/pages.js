const router = require('express').Router()

// 导入中间件
const { getBannerList, getUserInfo, getMyInfo } = require('../middleware/pages')
const { getGoodsList } = require('../middleware/goods')
const { getCartsList, test } = require('../middleware/carts')
const { LoginStat } = require('../middleware/users')
// 专门配置各种页面的路由请求
router.get('/index', getBannerList, getUserInfo, (req, res) => { res.render('index.html', { list: req.banner, nickname: req.nickname}) })
router.get('/login', (req, res) => res.render('login.html', {}))
router.get('/register', (req, res) => res.render('register.html', {}))
//如果有信息则渲染个人信息，如果没有则返回主界面
router.get('/myinfo', getMyInfo, (req, res) => {
  if (!req.result) {
    getBannerList()
    getUserInfo()
    return res.render('index.html', {})
  }
  res.render('myinfo.html', { info: req.result })
})

router.get('/goods', getGoodsList, (req, res) => res.render('goods.html', req.goodsList ))
router.get('/goods/:info/:cur', getGoodsList, (req, res) => res.render('goods.html', req.goodsList ))

router.get('/carts', LoginStat, getCartsList, test, (req, res) => {
  if (typeof req.id === 'undefined') return res.render('login.html', {})
  res.render('carts.html', { goodsList: req.goodsList })
})





// 商品数据结构: req.goodsList = { goodsList: list, current: current, pagesize: pagesize, total: total }
module.exports = router
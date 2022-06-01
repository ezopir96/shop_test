const router = require('express').Router()

// 导入中间件
const { getBannerList, getUserInfo } = require('../middleware/pages')

// 专门配置各种页面的路由请求
router.get('/index', getBannerList, getUserInfo, (req, res) => { res.render('index.html', { list: req.banner, nickname: req.nickname }) })
router.get('/login', (req, res) => res.render('login.html', {}))
router.get('/register', (req, res) => res.render('register.html', {}))

module.exports = router

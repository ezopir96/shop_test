const router = require('express').Router()

// oa 的用户相关路由
router.use('/users', require('./users'))
// 轮播图相关路由
router.use('/banner', require('./banner'))
// 网站的用户相关
router.use('/person', require('./person'))

module.exports = router

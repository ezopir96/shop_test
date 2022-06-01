const router = require('express').Router()

// 导入中间件
const { testLogin } = require('../middleware/users')
// 导入路由处理函数
const { login } = require('../controllers/users')

// 用户登录
router.post('/login', testLogin, login)

module.exports = router

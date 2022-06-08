const router = require('express').Router()
const { avatarUpload } = require('../utils/multer')
// 导入中间件
const { testLogin } = require('../middleware/users')
// 导入路由处理函数
const { login, register, unlogin, editMyInfo } = require('../controllers/users')

// 用户登录
router.post('/login', testLogin, login)
//注册
router.post('/register', register)
//注销
router.get('/unlogin', testLogin, unlogin)

module.exports = router

const router = require('express').Router()
const { avatarUpload } = require('../utils/multer')
// 导入中间件
const { testLogin, LoginStat } = require('../middleware/users')
// 导入路由处理函数
const { login, register, unlogin, repassword } = require('../controllers/users')

// 用户登录
router.post('/login', testLogin, login)
//注册
router.post('/register', register)
//注销
router.get('/unlogin', LoginStat, unlogin)

router.post('/repassword', LoginStat, repassword)

module.exports = router

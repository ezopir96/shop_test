const router = require('express').Router()

// 导入中间件
const { testLogin, testId } = require('../middleware/users')
// 导入路由处理函数
const { login, info } = require('../controllers/users')

// 登录接口
// 参数验证, 逻辑处理
router.post('/login', testLogin, login)

// 获取用户个人信息
router.get('/info/:id', testId, info)


module.exports = router

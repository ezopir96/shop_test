const router = require('express').Router()

// 导入中间件
const { testList, testStatus } = require('../middleware/person')
// 导入路由处理函数
const { list, status, editInfo, editChange, addUser, resetUser } = require('../controllers/person')

const { avatarUpload } = require('../utils/multer')

// 获取用户列表
router.get('/list', testList, list)

// 修改用户状态
router.patch('/status', testStatus, status)

//编辑初始化用户个人信息
router.get('/edit/:id', editInfo)

//编辑修改用户个人信息
router.post('/editChange/:id', avatarUpload.single('avatarEdit'), editChange)

//添加用户
router.post('/addUser', avatarUpload.single('avatarAdd'), addUser)

//重置用户密码
router.get('/reset/:id', resetUser)

module.exports = router

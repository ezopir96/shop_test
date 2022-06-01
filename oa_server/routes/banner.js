const router = require('express').Router()

// 导入路由处理函数
const { list, add, remove, info, update }  = require('../controllers/banner')
// 导入相关中间件
const { testAdd } = require('../middleware/banner')
const { testId } = require('../middleware/users')
// 导入相关的文件接收器
const { bannerUpload } = require('../utils/multer')

// 获取轮播图列表
router.get('/list', list)
// 增加一条信息(接受图片的中间件)
router.put('/add', bannerUpload.single('banner'), testAdd, add)
// 删除一条信息
router.delete('/remove/:id', testId, remove)
// 获取一条详细信息
router.get('/info/:id', testId, info)
// 修改一个轮播图
router.patch('/update', bannerUpload.single('banner'), testId, testAdd, update)

module.exports = router

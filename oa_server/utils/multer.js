// 创建图片接收器
const multer = require('multer')
const path = require('path')

// 轮播图图片存储库
const bannerStorage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/banner/'))
  },
  filename (req, file, cb) {
    const { ext } = path.parse(file.originalname)
    const filename = `banner_${ Date.now() }_${ Math.random().toString().slice(2) }${ ext }`
    cb(null, filename)
  }
})

// 头像修改存储
// ⭐⭐ 记录个障碍：req.body为什么为空？ ⭐⭐
// 需要自定义一个标记名，在中间件二次修改为用户信息名
const avatarStorage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/avatar'))
  },
  filename (req, file, cb) {
    const { ext } = path.parse(file.originalname)
    const filename = `temp${ ext }`
    cb(null, filename)
  }
})


// 导出文件接收器
module.exports = {
  bannerUpload: multer({ storage: bannerStorage }),
  avatarUpload: multer({ storage: avatarStorage })
}

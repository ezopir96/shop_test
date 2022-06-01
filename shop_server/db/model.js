// 创建各种数据库模型(数据库操作器)导出
const mongoose = require('mongoose')

// 创建一个轮播图相关模型
const banner = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 12 },
  img_url: { type: String, required: true },
  link: { type: String, default: 'http://www.qfedu.com/' },
  createTime: { type: Date, default: Date.now() }
})

// 创建一个用户相关模型
const person = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 12 },
  password: { type: String, required: true, minlength: 5, maxlength: 12 },
  nickname: { type: String, required: true, minlength: 2, maxlength: 6 },
  age: { type: Number, default: 0 },
  gender: { type: String, enum: [ '男', '女', '保密' ], default: '保密' },
  desc: { type: String, maxlength: 200, default: '这个人很懒, 什么都没有留下 ! ^_^' },
  avatar: { type: String, default: '/public/avatar/default.webp' },
  is_status: { type: Boolean, default: true },
  createTime: { type: Date, default: Date.now() }
})

// 导出
module.exports = {
  BannerModel: mongoose.model('banner', banner),
  PersonModel: mongoose.model('person', person)
}

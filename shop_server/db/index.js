// 需要封装方法
const mongoose = require('mongoose')

const Mongo = {
  connect () {
    // 进行数据库连接
    mongoose.connect('mongodb://localhost:27017/gp30', err => {
      if (err) return console.log('连接失败, 请检查你的数据库是否开启')
      console.log('连接到 mongodb 数据库成功 ^_^')
    })
  }
}

module.exports = Mongo

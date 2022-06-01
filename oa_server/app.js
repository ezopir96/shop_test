const express = require('express')

// 导入 cors
const cors = require('cors')
// 导入 body-parser
const body = require('body-parser')
// 导入 express-jwt
const { expressjwt } = require('express-jwt')
// 导入 path
const path = require('path')

// 导入配置信息
const { port, secret, pass } = require('./config')
// 导入路由总表
const router = require('./routes')
// 导入全局中间件
const { empty, error, info } = require('./middleware')
// 导入 mongodb 连接操作
const { connect } = require('./db')

const app = express()

// 连接数据库
connect()

// 开启跨域
app.use(cors())

// 配置静态资源(主要就是图片)
console.log('挂载静态资源static')
app.use('/static', express.static(path.join(__dirname, '../oa_client/')))

app.use('/public', express.static(path.join(__dirname, './public/')))
// 解析请求体
app.use(body({ extended: false }))
app.use(body.json())

// 全局中间件, 记录访问信息
app.use(info)

// 配置验证 token
app.use(expressjwt({
  secret,
  algorithms: ['HS256']
}).unless({ path: pass }))

// 挂载路由总表
app.use(router)

// 全局空路由配置
app.use(empty)

// 全局错误中间件
app.use(error)

// 监听指定端口
app.listen(port, () => {
  console.log(
    `
      启动服务器成功
      开始监听 ${ port } 端口号
      我是 oa 的服务器
    `
  )
})

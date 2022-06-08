const express = require('express')

// 导入 path 模块
const path = require('path')
// 导入 body-parser 模块
const body = require('body-parser')
// 导入 cookie-parser 模块
const cookie = require('cookie-parser')
// 导入 express-session 模块
const session = require('express-session')
// 导入配置文件
const { port, expires } = require('./config')
// 导入路由总表
const router = require('./routes')
// 导入数据库模块
const { connect } = require('./db')
// 导入全局中间件
const { empty, error, info } = require('./middleware')

const app = express()

// 开启数据库连接
connect()

// 配置静态资源
// 注意: 因为是服务端渲染, html 页面需要使用 express-art-template 渲染的
// 静态资源只是包括 css / js 等内容
// 因为将来会有图片上传, 所以图片尽量单独设置一个静态资源
app.use('/static', express.static(path.resolve(__dirname, '../shop_client/')))
app.use('/public', express.static(path.resolve(__dirname, './public')))

// 因为 html 页面需要渲染, 所以要配置 模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.resolve(__dirname, '../shop_client/pages/'))

// 配置解析请求头内的 cookie
app.use(cookie())

app.use(info)

// 配置解析请求体
app.use(body({ extended: false }))
app.use(body.json())


// 配置使用 session 空间
app.use(session({
  secret: 'myshop',
  resave: true,
  cookie: { maxAge: expires }
}))

// 配置路由表
app.use(router)

// 全局空路由配置
app.use(empty)

// 全局错误中间件
app.use(error)

app.listen(port, () => {
  console.log(
    `
      开启服务器成功
      目前在监听 ${ port } 端口
      shop 电商页面的服务器
    `
  )
})

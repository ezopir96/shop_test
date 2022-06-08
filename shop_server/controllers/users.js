// routes/users.js 使用的路由处理函数


// 导入数据库模型
const { PersonModel } = require('../db/model')

// 用户登录
const login = async (req, res) => {
  // 拿到用户名密码直接使用
  const { username, password } = req.body

  // 去访问数据库进行查询
  const result = await PersonModel.findOne({ username, password })

  // 判断, 如果 result 为 null 表示用户名密码错误
  if (!result) return res.send({ code: 0, message: '登录失败, 用户名密码错误' })

  // 代码来到这里, 说明该用户存在
  if (!result.is_status) return res.send({ code: 0, message: '登录失败, 该用户已经被禁用' })

  // 代码来到这里, 说明用户存储, 并且账号状态为启用
  // 需要提前向 session 内存储内容
  req.session.info = { id: result.id, username: result.username, nickname: result.nickname }
  res.send({ code: 1, message: '登录成功', user_id: result._id })
}

const register = async (req, res) => {
  const { username, password } = req.body
  console.log('收到注册请求', req.body)
  const cre = await PersonModel.create({
    username: username,
    password: password,
    nickname: 'defult',
    desc: '这个人很懒，什么都没有写 -_-!',
    age: 18,
    gender: '保密',
    createTime: Date.now(),
    avater: 'defult.webp'
  })
  res.send({
    code: 1,
    message: '注册成功！',
    info: req.body
  })
}

const unlogin = async (req, res) => {
  req.session.info = {}
  res.send({ code: 1, message: '注销成功' })
}


module.exports = {
  login,
  register,
  unlogin
}

// routes/users 内对应的路由处理函数
// 导入 jsonwebtoken
const jwt = require('jsonwebtoken')
// 导入数据库操作器
const { UserModel, PersonModel } = require('../db/model')
// 导入配置信息
const { secret, expires } = require('../config')

// 登录操作
const login = async (req, res) => {
  // 代码来到这里, 说明 username 和 password 一定存储
  // 并且是符合格式的
  // 1. 拿到用户名密码
  const { username, password } = req.body

  // 2. 去到数据库进行比对
  const result = await UserModel.findOne({ username, password })

  // 如果没有用户 result 就是 null
  // 如果有这个用户, result 就是用户信息

  // 3. 判断登录失败
  if (!result) return res.send({ code: 0, message: '登录失败' })

  // 4. 根据用户信息创建一个 token
  const token = 'Bearer ' + jwt.sign({ id: result._id }, secret, { expiresIn: expires })

  // 5. 返回登录成功的信息给到前端
  res.send({
    code: 1,
    message: '登录成功',
    token,
    user_id: result._id
  })
}

// 获取用户个人信息
const info = async (req, res) => {
  const { id } = req.params

  // 根据 id 获取个人信息
  const result = await UserModel.findById(id)
  // 返回给前端
  res.send({
    code: 1,
    message: '获取个人信息成功',
    info: {
      id: result._id,
      nickname: result.nickname,
      username: result.username,
      age: result.age,
      gender: result.gender,
      avatar: result.avatar,
      desc: result.desc
    }
  })
}



module.exports = {
  login,
  info
}

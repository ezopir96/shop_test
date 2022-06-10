// routes/person.js 使用的路由处理函数
const fs = require('fs')
const path = require('path')
// 导入相关模型
const { PersonModel } = require('../db/model')
const moment = require('moment')
// 配置成中文
moment.locale('zh-cn');

// 获取用户列表
const list = async (req, res) => {
  // 1. 拿出参数
  const { current, pagesize, is_status, gender, search } = req.query

  // 2. 按照参数从数据库中获取内容
  // 2-1. 计算开始索引
  const start = (current - 1) * pagesize
  // 2-2. 添加两个筛选条件
  const info = {
    nickname: new RegExp(search) ,
    gender: new RegExp(gender === 'all' ? '' : gender)
  }
  // 判断是否禁用的条件
  // 注意: 你的 is_status 是 1 和 0
  if (is_status !== 'all') info.is_status = is_status - 0 ? true : false
  const result = await PersonModel.find(info).skip(start).limit(pagesize)

  // 3. 获取总数
  const total = (await PersonModel.find(info)).length

  const list = []

  result.forEach(item => {
    list.push({
      id: item._id,
      username: item.username,
      password: item.password,
      nickname: item.nickname,
      gender: item.gender,
      age: item.age,
      desc: item.desc,
      avatar: item.avatar,
      is_status: item.is_status,
      createTime: moment(item.createTime).format('LLLL')
    })
  })

  console.log(list)
  res.send({
    code: 1,
    message: '获取用户列表成功',
    list: list,
    totalPage: Math.ceil(total / pagesize)
  })
}

// 修改用户状态
const status = async (req, res) => {
  // 1. 拿到参数信息
  const { id, status } = req.body

  // 2. 操作数据库修改信息
  await PersonModel.findByIdAndUpdate(id, { is_status: (status - 0 === 1 ? true : false) })

  // 3. 返回给前端修改完毕的信息
  res.send({
    code: 1,
    message: '修改用户状态成功, 当前用户已经被 ' + (status ? '启用' : '禁用')
  })
}

//编辑用户相关信息
const editInfo = async (req, res) => {
  const { id } = req.params

  // 根据 id 获取个人信息
  const result = await PersonModel.findById(id)
  // 返回给前端
  res.send({
    code: 1,
    message: '获取个人信息成功',
    info: {
      id: result._id,
      nickname: result.nickname,
      username: result.username,
      password: result.password,
      age: result.age,
      gender: result.gender,
      avatar: result.avatar,
      desc: result.desc
    }
  })
}

//编辑用户信息 传递修改值
// ⭐⭐ 头像名信息如何在修改数据库之前获取 ⭐⭐
const editChange = async (req, res) => {

  console.log(req.filename)
  const { id } = req.params
  // let avatarName = `/public/avatar/default.webp`

  await PersonModel.findByIdAndUpdate( id, {
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
    age: req.body.age,
    gender: req.body.gender,
    desc: req.body.desc,
    avatar: '/public/avatar/' + req.filename
  })

  res.send({
    code: 1,
    message: '修改个人信息成功',
    info: req.body,
    id: id
  })
  // //文件接收器存入 temp 文件，在这里二次命名🤤🤤
  // fs.readdir('./oa_server/public/avatar', function (err, files) {
  //   files.forEach(function (file) {
  //     if (file.split('.')[0] === 'temp') {
  //       avatarName = `/public/avatar/avatar_${ id }_.${ file.split('.')[1] }`
  //       fs.rename(`./oa_server/public/avatar/${ file }`,  `./oa_server/${ avatarName }`, async () => {
  //         //💀 这里需要把修改数据库操作放在重命名的回调函数内，以实现同步操作，因为读取文件夹操作必须为异步执行 💀
  //         if (err) return console.log(err)
  //         console.log(file)
  //         console.log(avatarName)
  //         await PersonModel.findByIdAndUpdate( id, {
  //           username: req.body.username,
  //           password: req.body.password,
  //           nickname: req.body.nickname,
  //           age: req.body.age,
  //           gender: req.body.gender,
  //           desc: req.body.desc,
  //           avatar: avatarName
  //         })
  //       })
  //     }
  //   })
  // })

  // //⭐⭐ 如果没有上传头像则不会进入修改文件的判断，那么也不会修改其他信息，所以需要额外同步修改一次除图片外的信息 ⭐⭐
  // await PersonModel.findByIdAndUpdate( id, {
  //   username: req.body.username,
  //   password: req.body.password,
  //   nickname: req.body.nickname,
  //   age: req.body.age,
  //   gender: req.body.gender,
  //   desc: req.body.desc
  // })

  // console.log('aaaa',avatarName)
  

  
}

const addUser = async (req, res) => {

  //let avatarName = `/public/avatar/default.webp`

  console.log(req.filename)
  const cre = await PersonModel.create({
    username: req.body.username,
    password: req.body.password,
    nickname: req.body.nickname,
    desc: req.body.desc,
    age: req.body.age,
    gender: req.body.gender,
    createTime: Date.now(),
    avatar: '/public/avatar/' + req.filename
  })


  res.send({
    code: 1,
    message: '添加的个人信息成功',
    info: req.body
  })
}


const resetUser = async (req, res) => {
  
  const { id } = req.params
  PersonModel.findByIdAndUpdate( id, {
    password: '123456'
  }, (err, result) => {
    if (err) return res.send({ code: 0, message: '修改密码失败' })
    res.send({
      code: 1,
      message: '重置密码成功',
      info: id
    })
  })
}

const editMyInfo = async (req, res) => {

  const { avatarName } = req.params
  // 新头像或 undefiend
  console.log('a = ', req.filename)
  // 旧头像或 'undefiend'
  console.log('b = ', avatarName)
  // 删除旧头像 (仅当有新头像传入并且旧头像存在)
  if (req.filename && (avatarName !== 'undefined')) fs.unlinkSync('./oa_server/public/avatar/' + avatarName)
  // 如果有新头像则直接命名, 没有的话则传入旧头像名

  console.log(req.body)
  const {
    username,
    nickname,
    age,
    gender,
    desc
  } = req.body
  console.log('flandre = ', username, nickname, age, gender, desc)
  const id = req.headers.user_id
  const avatar = req.filename ? req.filename : avatarName
  console.log('image = ', avatar)
  await PersonModel.findByIdAndUpdate(id, {
    username: username,
    nickname: nickname,
    age: age,
    gender: gender,
    desc: desc,
    avatar: '/public/avatar/' + avatar
  })
  console.log('avatar = /public/avatar/', avatar.trim())

  res.send({
    code: 1,
    message: '修改成功',
    info: req.body
  })
}

module.exports = {
  list,
  status,
  editInfo,
  editChange,
  addUser,
  resetUser,
  editMyInfo
}

# 项目介绍

## 目录结构

- `oa_client`
  + 后台管理系统的客户端页面
- `oa_server`
  + 后台管理系统的服务器
  + 开启 cors
- `shop_client`
  + 电商网站的客户端页面
- `shop_server`
  + 电商网站的服务器

## oa 后台管理系统

- 对于用户的增删改查
- 对于商品的增删改查
- 对于轮播图的增删改查
- ...

## 项目功能

- `oa` 相关功能
  = 轮播图管理全套
  = 用户管理
  + 展示用户列表
  + 分页
  + 筛选
  + 修改用户状态(启用/禁用)
  + 重置用户密码(123456)
  + 添加新用户
  + 删除用户
  + 编辑用户信息
- `shop` 相关功能
  = 轮播图展示
  = 用户相关
  + 登录
  + 退出登录
  + 个人中心页面展示
  + 个人信息编辑(修改 年龄/性别/个人描述/昵称/头像)
  + 个人密码修改
    = 注册相关
  + 可以注册新用户(用户名/密码/重复密码/昵称)
    = 商品列表(爬一些简单的商品)
  + 展示商品列表
  + 分页
    = 购物车
  + 添加内容到购物车
  + 购物车全套增删改查


## 数据库格式

  - oa 账户集合 (users)
    + user002
    + 1234562
  - shop 用户集合 (people)
    + username (使用的:user555)
    + password (使用的:123321)
    + nickname
    + age
    + gender  男 | 女 | 保密
    + avatar  本地地址 /public/avatar/default.webp
    + is_status Boolean
    + createTime
  - 轮播图集合 (banners)
    + title 
    + img_url 轮播图图片地址
    + link 轮播图点击跳转地址
    + createTime 创建时间
  - 商品集合 (goods)
    + title
    + price 商品价格
    + link 商品图片
    + category
    + createTime
  - 购物车集合 (carts)
    + user  用户ID
    + goods 商品ID
    + number  数量
    + price 单价
    + is_selected 是否被选中

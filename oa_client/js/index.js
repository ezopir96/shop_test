$(function () {

  // 1. 实现选项卡效果
  $('.nav > li').click(function () {
    $(this).addClass('active').siblings().removeClass('active')
    $('.box > li').removeClass('active').eq($(this).index()).addClass('active')

    switch ($(this).index()) {
      case 0: getUserList(); break;
      case 1: getBannerList(); break
    }
  })


  // 2. 进行登录验证
  // 2-1. 拿到 sessionStorage 内的信息
  const token = window.sessionStorage.getItem('token')
  const id = window.sessionStorage.getItem('id')
  testLogin()
  async function testLogin() {
    // 2-2. 判断 token 和 id 是否存在
    if (!token || !id) return window.location.href = './login.html'

    // 2-3. 发送请求请求用户个人信息
    const res = await $.ajax({
      url: 'http://localhost:8080/users/info/' + id,
      headers: { authorization: token }
    })

    // 有可能失败有可能成功
    if (res.code === 1) {
      $('.nickname').text(res.info.nickname)

      // 页面逻辑启动
      init()

      return
    }

    window.location.href = './login.html'
  }

  // 3. 页面逻辑启动函数
  function init() {
    // 获取轮播图列表
    // getBannerList()

    // 获取用户列表
    getUserList()
  }


  // ======================= 轮播图管理相关内容 =======================
  // 4. 获取轮播图列表
  async function getBannerList() {
    // 直接发送请求, 请求列表
    const res = await $.ajax({ url: 'http://localhost:8080/banner/list', headers: { authorization: token } })
    // 使用列表渲染表格
    $('.banner_list > tbody').html(template('list_template', { list: res.list }))
  }

  // 5. input type=file 改变的时候触发事件
  $('.banner .form input[type=file]').on('change', function () {
    // 利用 FileReader 读取文件信息, 展示在指定位置
    const fileInfo = this.files[0]

    if (!fileInfo) return

    if (fileInfo.type.split('/')[0] !== 'image') return this.value = ''

    const fr = new FileReader()
    fr.readAsDataURL(fileInfo)
    fr.onload = res => {
      // 展示出来
      $(this).prev().css('background-image', `url(${ res.currentTarget.result })`)
    }
  })

  // 6. 点击确定按钮上传
  $('.banner > .add').on('submit', async e => {
    e.preventDefault()

    // 利用 FormData 获取表单信息
    const fm = new FormData($('form')[0])

    // 发送 ajax 上传
    const res = await $.ajax({
      url: 'http://localhost:8080/banner/add',
      method: 'PUT',
      data: fm,
      processData: false,
      contentType: false,
      headers: { authorization: token }
    })

    if (res.code === 0) return alert(res.message)

    if (res.code === 1) {
      alert('添加轮播图成功')
      getBannerList()
      $('form')[0].reset()
      $('.banner .add .show div')[0].style.backgroundImage = ''
    }
  })

  // 7. 删除一个轮播图的事件
  $('.banner tbody').on('click', '.del', async function () {
    if (!window.confirm('您确定要删除该内容吗 ?')) return

    // 发送删除的请求
    const res = await $.ajax({
      url: 'http://localhost:8080/banner/remove/' + this.dataset.id,
      method: 'DELETE',
      headers: { authorization: token }
    })

    if (res.code === 0) return alert(res.message)

    if (res.code === 1) {
      alert('删除成功')
      getBannerList()
      return
    }
  })

  // 8. 进入编辑状态的事件
  $('.banner tbody').on('click', '.edit', async function () {
    // 根据 id 获取到轮播图详细信息
    const res = await $.ajax({
      url: 'http://localhost:8080/banner/info/' + this.dataset.id,
      headers: { authorization: token }
    })

    if (res.code !== 1) return

    // 拿到信息填充到指定标签内
    $('.banner > .edit .title').val(res.info.title)
    $('.banner > .edit .link').val(res.info.link)
    $('.banner > .edit .show div').css('background-image', `url(http://localhost:8080${ res.info.img_url })`)
    $('.banner > .edit .update').attr('data-id', res.info.id)
    $('.banner > .edit').show()
    $('.banner > .add').hide()
  })

  // 9. 取消编辑状态
  $('.banner > .edit .cancel').on('click', () => {
    $('.banner > .edit')[0].reset()
    $('.banner > .edit .show div')[0].style.backgroundImage = ''
    $('.banner > .edit').hide()
    $('.banner > .add').show()
  })

  // 10. 确定编辑
  $('.banner > .edit').on('submit', async e => {
    e.preventDefault()

    // 利用 FormData 获取表单信息
    const fm = new FormData($('.banner > .edit')[0])

    // 补充一个 id 信息
    fm.append('id', $('.banner > .edit .update')[0].dataset.id)

    // 发送 ajax 上传
    const res = await $.ajax({
      url: 'http://localhost:8080/banner/update',
      method: 'PATCH',
      data: fm,
      processData: false,
      contentType: false,
      headers: { authorization: token }
    })

    if (res.code === 0) return alert(res.message)

    if (res.code === 1) {
      alert('修改轮播图成功')
      getBannerList()
      $('.banner > .edit .cancel').trigger('click')
    }
  })
  // ======================= 轮播图管理相关内容 =======================



  // ======================= 用户管理相关内容 =======================
  // 准备一个变量保存获取列表的信息
  const list_info = {
    current: 1,
    pagesize: 5,
    is_status: 'all',
    gender: 'all',
    search: ''
  }

  // 1. 获取用户列表
  async function getUserList() {
    // 获取用户列表
    const res = await $.ajax({
      url: 'http://localhost:8080/person/list',
      headers: { authorization: token },
      data: list_info
    })

    // 根据 res 来渲染页面列表
    $('.users tbody').html(template('users_template', { list: res.list }))

    // 根据 res 来渲染页面分页器
    $('.users .pagination').html(template('users_pagination', { list_info, list: res.list, total: res.totalPage }))

    // 根据 res 来渲染筛选框
    $('.users .filter_box').html(template('users_filter', { list_info }))
  }

  // 2. 事件委托, 实现分页器的各种效果
  $('.users .pagination').on('click', e => {
    const t = e.target

    if (t.className === 'next') {
      list_info.current++
      getUserList()
    }

    if (t.className === 'prev') {
      list_info.current--
      getUserList()
    }

    if (t.className === 'first') {
      list_info.current = 1
      getUserList()
    }

    if (t.className === 'last') {
      list_info.current = t.dataset.total - 0
      getUserList()
    }

    if (t.className == 'item') {
      list_info.current = t.innerText - 0
      getUserList()
    }

    if (t.className === 'go') {
      let page = $(t).prev().val() - 0

      if (isNaN(page)) page = 1
      if (page <= 1) page = 1
      if (page >= t.dataset.total - 0) page = t.dataset.total - 0
      page = parseInt(page)

      list_info.current = page
      getUserList()
    }
  })

  // 3. 事件委托, 实现筛选效果
  $('.users .filter_box').on('click', 'button', () => {
    list_info.search = $('.users .filter_box').find('.search').val()
    list_info.gender = $('.users .filter_box').find('.gender').val()
    list_info.is_status = $('.users .filter_box').find('.status').val()
    list_info.pagesize = $('.users .filter_box').find('.pagesize').val() - 0

    getUserList()
  })

  // 4. 事件委托, 实现修改用户状态事件
  $('.users table tbody').on('change', 'select', async function () {
    // 拿到药修改的用户 id 和 状态
    const id = this.dataset.id
    const status = this.value === '启用' ? 1 : 0

    // 发送请求
    const res = await $.ajax({
      url: 'http://localhost:8080/person/status',
      method: 'PATCH',
      data: { id, status },
      headers: { authorization: token }
    })

    // 判断操作
    if (res.code === 1) return alert(res.message)
  })
})

// ================== 用户删除  =====================
$('.users_list').on('click', '.resetInfo', async function () {
  const id = this.dataset.id
  const token = window.sessionStorage.getItem('token')

  const res = await $.ajax({
    url: 'http://localhost:8080/person/reset/' + id,
    headers: { authorization: token }
  })

  alert(res.message)
  location.reload()
})


// ================== 用户重置密码  =====================
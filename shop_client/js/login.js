$(function () {

  // 1. 表单的登录事件
  $('form').on('submit', async e => {
    e.preventDefault()

    // 发送请求
    const res = await $.ajax({
      url: '/users/login',
      data: $('form').serialize(),
      method: 'POST'
    })

    if (res.code === 0) {
      $('form .error').text(res.message).show()
      return
    }

    // 跳转页面
    window.location.href = '/pages/index'
  })
})

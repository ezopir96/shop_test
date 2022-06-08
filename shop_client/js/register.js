$(function () {
  $('form').on('submit', async e => {
    e.preventDefault()

    const res = await $.ajax({
      url: '/users/register',
      method: 'POST',
      data: $('form').serialize()
    })
    console.log(res.code)
    if (res.code === 1) {
      const resLogin = await $.ajax({
        url: '/users/login',
        method: 'POST',
        data: $('form').serialize()
      })
      console.log(resLogin.code)
      if (resLogin.code === 1) {
        window.location.href = '/pages/index'
      }
    } else {
      alert(res.message)
    }
  })
})
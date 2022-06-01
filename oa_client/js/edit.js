
//显示修改信息模态框 并初始化信息
$('.users_list').on('click', '.editInfo', async function () {
    const token = window.sessionStorage.getItem('token')
    console.log(this.dataset.id)
    $('.dialogEdit').attr('data-id', this.dataset.id)

    $('.dialogEdit').show()
    const res = await $.ajax({
        url: 'http://localhost:8080/person/edit/' + this.dataset.id,
        headers: { authorization: token }
    })
    
    const list = res.info


    console.log(list)
    $('.dialogEdit > .dialog > form > label > .avatar').attr('src', `http://localhost:8080${ list.avatar }`)
    $('.dialogEdit > .dialog > form > label > .username').val(list.username)
    $('.dialogEdit > .dialog > form > label > .password').val(list.password)
    $('.dialogEdit > .dialog > form > label > .nickname').val(list.nickname)
    $('.dialogEdit > .dialog > form > label > .age').val(list.age)
    $('.dialogEdit > .dialog > form > label > .gender').val(list.gender)
    $('.dialogEdit > .dialog > form > label > #desc').val(list.desc)
})


//点击上传修改信息
$('.dialogEdit').on('submit', '.dialog > form', async function (e) {

    e.preventDefault()
    const token = window.sessionStorage.getItem('token')

    const password = $('.dialogEdit > .dialog > form > label > .password').val()
    const repassword = $('.dialogEdit > .dialog > form > label > .repassword').val()
    if (password !== repassword) return alert('两次密码不一致')
    //补一个判断空的逻辑 (●'◡'●)

    const fm = new FormData($('.dialogEdit > .dialog > form')[0])

    //根据编辑按钮获取 id 传给后台，并根据 id 重命名头像文件⭐⭐⭐
    const id = $('.dialogEdit').attr('data-id')
    console.log(fm)
    const res = await $.ajax({
        url: 'http://localhost:8080/person/editChange/' + id,
        method: 'POST',
        data: fm,
        processData: false,
        contentType: false,
        headers: { authorization: token }
    })

    console.log(res)
    $('.dialogEdit').hide()
})

//⭐⭐⭐⭐头像图片操作
$('.dialogEdit').on('change', 'input[type=file]', function () {
    const fileInfo = this.files[0]

    if (!fileInfo) return

    if (fileInfo.type.split('/')[0] !== 'image') return this.value = ''

    const fr = new FileReader()

    fr.readAsDataURL(fileInfo)

    fr.onload = res => {
        $(this).next().attr('src', res.currentTarget.result)
    }
})

$('.dialogEdit').on('click', '.editCancle', e => {
    e.preventDefault()
    $('.dialogEdit').hide()
})
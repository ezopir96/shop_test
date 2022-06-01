//显示添加信息模态框 并初始化信息
$('.add > button').on('click', () => {
    console.log('click')
    $('.addForm > label > .avatar').attr('src', 'http://localhost:8080/public/avatar/default.webp')
    $('.addForm > label > textarea').val('这个人很懒，什么都没有说')
    $('.dialogAdd').show()
})

$('.addBtn').on('click', async e => {
    e.preventDefault()
    const token = window.sessionStorage.getItem('token')

    console.log($('.addForm')[0])
    const fm = new FormData($('.addForm')[0])
    const res = await $.ajax({
        url: 'http://localhost:8080/person/addUser',
        method: 'POST',
        data: fm,
        processData: false,
        contentType: false,
        headers: { authorization: token }
    })

    console.log(res)
    $('.dialogAdd').hide()
    // location.reload()
})

$('#avatarAdd').on('change', function () {

    console.log('avatar changed')
    const fileInfo = this.files[0]

    if (!fileInfo) return

    if (fileInfo.type.split('/')[0] !== 'image') return this.value = ''

    const fr = new FileReader()
    fr.readAsDataURL(fileInfo)
    fr.onload = res => {
        $(this).next().attr('src', res.currentTarget.result)
    }
    
})

$('.addCancle').on('click', e => {
    e.preventDefault()
    $('.dialogAdd').hide()
})

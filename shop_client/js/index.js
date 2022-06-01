// 初始化轮播图
new Swiper('.swiper', {
  loop: true, // 循环模式选项
  autoplay: {
    delay: 2000
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
})

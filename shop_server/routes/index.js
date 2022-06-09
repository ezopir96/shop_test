const router = require('express').Router()

router.use('/pages', require('./pages'))
router.use('/users', require('./users'))
router.use('/carts', require('./carts'))
module.exports = router

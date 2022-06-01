const router = require('express').Router()

router.use('/pages', require('./pages'))
router.use('/users', require('./users'))

module.exports = router

const express = require('express')
const router = express.Router()


// API Health Route
router.get('/', (req, res) => {
    res.status(201).send('up')
})

// API routes
router.use('/users', require('./user'))
router.use('/expenses', require('./expense'))
router.use('/incomes', require('./income'))
router.use('/documents', require('./document'))
router.use('/stats', require('./stats'))

module.exports = router
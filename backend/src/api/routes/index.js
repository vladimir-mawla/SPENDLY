const express = require('express')
const router = express.Router()


// API Health Route
router.get('/', (req, res) => {
    res.status(201).send('up')
})

// API routes
router.use('/users', require('./userRoutes'))

module.exports = router
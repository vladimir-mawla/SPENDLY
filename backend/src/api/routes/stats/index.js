const express = require('express')
const router = express.Router()

const {
    getGeneral,
    getUserStats,
    getDiscoverUsers,
    getPublicUserInfo,
  } = require('../../controllers/statsController')

const { protect } = require('../../middlewares/authMiddleware')
  
// Routes on /api/stats/ 
router.get('/', getGeneral)
router.get('/me', protect,  getUserStats)
router.get('/discover', protect,  getDiscoverUsers)
router.get('/:id', getPublicUserInfo)

module.exports = router
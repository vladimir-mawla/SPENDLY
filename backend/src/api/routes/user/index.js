const express = require("express")
const router = express.Router()

const {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  getCurrentUser,
  requestResetPassword,
  uploadProfilePic,
} = require("../../controllers/userController")

const { protect } = require("../../middlewares/authMiddleware")
// const { upload } = require("../../middlewares/multerS3Middleware")

// Routes on /api/users/
router
  .route("/")
  .post(registerUser)
  .put(protect, updateUser)
  .get(protect, getCurrentUser)

router.post("/login", loginUser)
router.post("/reset", resetPassword)
router.post("/request.reset", requestResetPassword)
// router.post("/upload", protect, upload.single("file"), uploadProfilePic)

module.exports = router

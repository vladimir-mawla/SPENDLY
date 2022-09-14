const express = require("express")
const router = express.Router()

const {
  getDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
} = require("../../controllers/documentController")

const { protect } = require("../../middlewares/authMiddleware")
// const { upload } = require("../../middlewares/multerS3Middleware")

// Routes on /api/documents/
router.route("/")
      // .post(protect, upload.single("file"), setDocument)
      // .put(protect, upload.single("file"), updateDocument)

router.get("/:model/:id", protect, getDocuments)

router
  .route("/:id")
  .delete(protect, deleteDocument)
  

module.exports = router

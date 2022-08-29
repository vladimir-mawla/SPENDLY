const asyncHandler = require("express-async-handler")
const Document = require("../models/documentModel")
const { log } = require("../middlewares/logMiddleware")

// @desc    Get documents for a transaction
// @route   GET /api/documents/:model/:id
// @access  Private
const getDocuments = asyncHandler(async (req, res) => {
  if (!req.params.model || !req.params.id) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  const docs = await Document.find({
    model: req.params.model,
    extends: req.params.id,
  })

  res.status(200).json(docs)
})


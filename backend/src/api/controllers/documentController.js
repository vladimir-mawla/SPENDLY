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

// @desc    Set document for a transaction
// @route   POST /api/documents
// @access  Private
const setDocument = asyncHandler(async (req, res) => {
  const link = req.file.location

  if (!link) {
    res.status(400)
    throw new Error("Please Try Again")
  }

  const doc = await Document.create({
    model: req.body.model,
    extends: req.body.transactionId,
    notes: req.body.notes,
    date: req.body.date,
    document: link,
  })

  res.status(200).json(doc)
  log(req, res, doc)
})


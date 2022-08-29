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

// @desc    Update document
// @route   PUT /api/documents
// @access  Private
const updateDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.body.id)
  const link = req.file.location

  if (!doc) {
    res.status(400)
    throw new Error("Document not found")
  }

  if (!link) {
    res.status(400)
    throw new Error("Please Try Again")
  }

  doc.notes = req.body.notes
  doc.date = req.body.date
  doc.document = link

  const updatedDoc = await doc.save()

  res.status(200).json(updatedDoc)
  log(req, res, updatedDoc)
})

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id)

  if (!doc) {
    res.status(400)
    throw new Error("Document not found")
  }

  await doc.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
}

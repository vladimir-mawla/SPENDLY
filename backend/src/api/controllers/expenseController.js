const asyncHandler = require("express-async-handler")
const csvtojson = require("csvtojson")
const json2csv = require("json2csv").parse
const fs = require("fs")
const { validateImport } = require("../helpers/common")
const Expense = require("../models/expenseModel")

// @desc    Get expenses
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })

  res.status(200).json(expenses)
})

// @desc    Set expense
// @route   POST /api/expenses
// @access  Private
const setExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create({
    user: req.user.id,
    type: req.body.type,
    amount: req.body.amount,
    date: req.body.date,
  })

  res.status(200).json(expense)
})

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    res.status(400)
    throw new Error("Expense not found")
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  expense.type = req.body.type
  expense.amount = req.body.amount
  expense.date = req.body.date

  const updatedExpense = await expense.save()

  res.status(200).json(updatedExpense)
})

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    res.status(400)
    throw new Error("Expense not found")
  }

  // Make sure the logged in user matches the expense user
  if (expense.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await expense.remove()

  res.status(200).json({ id: req.params.id })
})

// @desc    Import expense CSV
// @route   POST /api/expenses/import
// @access  Private
const importExpense = asyncHandler(async (req, res) => {
  // read uploaded csv
  let source = await csvtojson().fromFile(req.file.path)

  // validate data and append values
  let validated = validateImport(source, req.user.id)

  // insert all records
  const imports = await Expense.insertMany(validated.data)

  // update user stats since middleware won't work on .insertMany
  req.user.transactions += imports.length
  req.user.totalExpense += validated.totalAmount
  req.user.save()

  // delete the uploaded csv from the static folder
  await fs.promises.unlink(req.file.path)

  res.status(200).json({ file: req.file, expenses: imports })
})

// @desc    Export expense CSV
// @route   GET /api/expenses/export
// @access  Private
const exportExpense = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id })

  // fields to export in csv
  const fields = ["type", "amount", "date", "createdAt", "updatedAt"]

  // create csv
  let csv = await json2csv(expenses, { fields })

  // save csv to static folder
  const filename = `income-${Date.now()}.csv`

  if (req.user.settings.emailExports) {
    const userName = `${req.user.firstName} ${req.user.lastName}`
  }

  res.status(200).attachment(filename).send(csv)
})

module.exports = {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
  importExpense,
  exportExpense,
}

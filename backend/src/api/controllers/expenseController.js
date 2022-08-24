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

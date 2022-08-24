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

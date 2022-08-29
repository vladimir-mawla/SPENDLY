const asyncHandler = require("express-async-handler")
const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")
const User = require("../models/userModel")
const mongoose = require("mongoose")

// @desc    Get user stats
// @route   GET /api/stats/me
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  // get expenses stats
  let expenseStats = await Expense.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" },
      },
    },
  ]).sort({ _id: 1 })

  // get incomes stats
  let incomeStats = await Income.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" },
      },
    },
  ]).sort({ _id: 1 })

  // construct res
  const resData = {
    incomes: incomeStats,
    expenses: expenseStats,
  }

  res.status(200).json(resData)
})


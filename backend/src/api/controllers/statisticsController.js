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

// @desc    Get public user's info
// @route   GET /api/stats/:id
// @access  Public
const getPublicUserInfo = asyncHandler(async (req, res) => {

  let id = req.params.id

  const user = await User.findOne(
    { _id: id },
    {
      _id: 1,
      orgName: 1,
      country: 1,
      city: 1,
      websiteAddress: 1,
      phone: 1,
      about: 1,
      totalIncome: 1,
      totalExpenses: 1,
      logoURL: 1,
      createdAt: 1,
      'settings.publicVisibility': 1,
    }
  )

  if(!user) {
    res.status(400)
    throw new Error("User not found")
  }

  if(!user.settings.publicVisibility) {
    res.status(400)
    throw new Error("User is not publicly available")
  }

  res.status(200).json(user)
})

module.exports = {
  getUserStats,
  getPublicUserInfo
}

const asyncHandler = require("express-async-handler")
const Income = require("../models/incomeModel")
const Expense = require("../models/expenseModel")
const User = require("../models/userModel")
const mongoose = require("mongoose")

// @desc    Get general stats
// @route   GET /api/stats
// @access  Public
const getGeneral = asyncHandler(async (req, res) => {
  // get users with publicVisibility
  const users = await User.find(
    { "settings.publicVisibility": true },
    {
      _id: 1,
      orgName: 1,
      country: 1,
      city: 1,
      totalIncome: 1,
      totalExpenses: 1,
      logoURL: 1,
      createdAt: 1,
    }
  )

  let userIds = users.map((user) => {
    return user._id
  })

  // get expenses and incomes of above users
  const expenses = await Expense.aggregate([
    { $match: { user: { $in: userIds } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" },
      },
    },
  ]).limit(15).sort({ _id: 1 })

  const incomes = await Income.aggregate([
    { $match: { user: { $in: userIds } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        total: { $sum: "$amount" },
      },
    },
  ]).limit(15).sort({ _id: 1 })

  // sort users into most recent registered and highest income users
  const recentUsers = users
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
    .slice(0, 5)

  const highIncomeUsers = users
    .sort((a, b) => {
      return b.totalIncome - a.totalIncome
    })
    .slice(0, 5)

  // get count and total stats
  let usersStats = await User.aggregate([
    {
      $group: {
        _id: null,
        totalIncome: { $sum: "$totalIncome" },
        totalExpenses: { $sum: "$totalExpenses" },
        count: { $count: {} },
      },
    },
  ])

  usersStats = usersStats[0]

  // construct res
  const resData = {
    usersCount: usersStats.count,
    totalIncome: usersStats.totalIncome,
    totalExpenses: usersStats.totalExpenses,
    users: {
      recent: recentUsers,
      highestIncome: highIncomeUsers,
    },
    incomes: incomes,
    expenses: expenses,
  }

  res.status(200).json(resData)
})

// @desc    Get user general stats
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

// @desc    Get public users
// @route   GET /api/stats/discover
// @access  Private
const getDiscoverUsers = asyncHandler(async (req, res) => {

  const users = await User.find(
    { "settings.publicVisibility": true, _id: { $ne: req.user.id } },
    {
      _id: 1,
      orgName: 1,
      country: 1,
      city: 1,
      totalIncome: 1,
      totalExpenses: 1,
      logoURL: 1,
      createdAt: 1,
    }
  ).sort({ createdAt: -1 })

  res.status(200).json(users)
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
  getGeneral,
  getUserStats,
  getDiscoverUsers,
  getPublicUserInfo
}

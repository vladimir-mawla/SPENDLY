const User = require('../models/userModel')

async function updateUserIncome(doc) {

    const user = await User.findById(doc.user._id)

    if (doc.tempAmount) {
        const diff = doc.amount - doc.tempAmount
        user.totalIncome += diff
    } else {
        user.totalIncome += doc.amount
        user.transactions += 1
    }

    user.save()
}

async function truncateUserIncome(doc) {

    const user = await User.findById(doc.user._id)

    user.transactions -= 1
    user.totalIncome -= doc.amount

    user.save()
}

async function updateUserExpense(doc) {

    const user = await User.findById(doc.user._id)

    if (doc.tempAmount) {
        const diff = doc.amount - doc.tempAmount
        user.totalExpenses += diff
    } else {
        user.totalExpenses += doc.amount
        user.transactions += 1
    }

    user.save()
}

async function truncateUserExpense(doc) {

    const user = await User.findById(doc.user._id)

    user.transactions -= 1
    user.totalExpense -= doc.amount

    user.save()
}

module.exports = {
    updateUserIncome,
    truncateUserIncome,
    updateUserExpense,
    truncateUserExpense
}
const express = require("express")
const router = express.Router()

const {
  getExpenses,
  setExpense,
  updateExpense,
  deleteExpense,
  importExpense,
  exportExpense
} = require("../../controllers/expenseController")

const { protect } = require("../../middlewares/authMiddleware")

// Routes on /api/expenses/
router.route("/")
        .post(protect, setExpense)
        .get(protect, getExpenses)

router.post("/import", protect, importExpense)
router.get("/export", protect, exportExpense)

router.route("/:id")
        .delete(protect, deleteExpense)
        .put(protect, updateExpense)

module.exports = router

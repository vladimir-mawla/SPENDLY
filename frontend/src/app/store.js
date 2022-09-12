import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import incomeReducer from "../features/income/incomeSlice"
import expenseReducer from "../features/expense/expenseSlice"
import statsReducer from "../features/stats/statsSlice"
import documentReducer from "../features/document/documentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    income: incomeReducer,
    expense: expenseReducer,
    stats: statsReducer,
    document: documentReducer,
  },
})

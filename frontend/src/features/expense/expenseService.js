import axios from "../../helpers/axios"
import fileDownload from "js-file-download"
import { format } from "date-fns"

const BASE_URL = "/expenses"

// Create new expense
const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(BASE_URL, expenseData, config)

  return response.data
}

// Get user expenses
const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL, config)

  return response.data
}

// Delete user expense
const deleteExpense = async (expenseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(BASE_URL + `/${expenseId}`, config)

  return response.data
}

// Update user expense
const updateExpense = async (expenseId, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    BASE_URL + `/${expenseId}`,
    expenseData,
    config
  )

  return response.data
}

// Upload expense data
const uploadData = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }

  const response = await axios.post(BASE_URL + `/import`, formData, config)

  return response.data
}

// Export income data
const exportData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      responseType: "blob",
    },
  }

  const response = await axios.get(BASE_URL + `/export`, config)

  fileDownload(
    response.data,
    `Expenses-${format(Date.now(), "MM/dd/yyyy")}.csv`
  )
}

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  uploadData,
  exportData,
}

export default expenseService

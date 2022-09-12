import axios from "../../helpers/axios"
import fileDownload from "js-file-download"
import { format } from "date-fns"

const BASE_URL = "/incomes"

// Create new income
const createIncome = async (incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(BASE_URL, incomeData, config)

  return response.data
}

// Get user incomes
const getIncomes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL, config)

  return response.data
}

// Delete user income
const deleteIncome = async (incomeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(BASE_URL + `/${incomeId}`, config)

  return response.data
}

// Update user income
const updateIncome = async (incomeId, incomeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    BASE_URL + `/${incomeId}`,
    incomeData,
    config
  )

  return response.data
}

// Upload income data
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

  fileDownload(response.data, `Income-${format(Date.now(), "MM/dd/yyyy")}.csv`)
}

const incomeService = {
  createIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
  uploadData,
  exportData,
}

export default incomeService

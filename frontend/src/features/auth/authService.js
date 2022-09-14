import axios from "../../helpers/axios"

const BASE_URL = "/users"

// Register user
const register = async (userData) => {
  const res = await axios.post(BASE_URL, userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return res.data
}

// Login user
const login = async (userData) => {
  const res = await axios.post(BASE_URL + "/login", userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  return res.data
}

// Update user
const update = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.put(BASE_URL, userData, config)

  return res.data
}

// get current user
const getCurrent = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.get(BASE_URL + "/", config)

  return res.data
}

// Logout user
const logout = () => {
  localStorage.removeItem("user")
}

// Request forgot password
const forgotPass = async (userData) => {
  const res = await axios.post(BASE_URL + "/request.reset", userData)

  return res.data
}

// Reset password
const resetPass = async (userData) => {
  const res = await axios.post(BASE_URL + "/reset", userData)

  return res.data
}

// Reset password
const uploadProfilePic = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }

  const response = await axios.post(BASE_URL + `/upload`, formData, config)

  return response.data
}

const authService = {
  register,
  logout,
  login,
  update,
  getCurrent,
  forgotPass,
  resetPass,
  uploadProfilePic,
}

export default authService

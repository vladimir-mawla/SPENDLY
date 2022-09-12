import axios from "../../helpers/axios"

const BASE_URL = "/stats"

// Get Public stats
const getPublic = async () => {
  const response = await axios.get(BASE_URL)

  return response.data
}

// Get user stats
const getUserStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL + `/me`, config)

  return response.data
}

// Get public users
const getDiscoverUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL + `/discover`, config)

  return response.data
}

// Get public user info
const getPublicUserInfo = async (id) => {
  const response = await axios.get(BASE_URL + `/${id}`)

  return response.data
}

const statsService = {
  getPublic,
  getUserStats,
  getDiscoverUsers,
  getPublicUserInfo,
}

export default statsService

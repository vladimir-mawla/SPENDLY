import axios from "../../helpers/axios"

const BASE_URL = "/documents"

// Get documents for a transaction
const getDocuments = async (model, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(BASE_URL + `/${model}/${id}`, config)

  return response.data
}

// Set document for a transaction
const setDocument = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }

  const response = await axios.post(BASE_URL, formData, config)

  return response.data
}

// Update document
const updateDocument = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }

  const response = await axios.put(BASE_URL, formData, config)

  return response.data
}

// Delete document
const deleteDocument = async (docId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(BASE_URL + `/${docId}`, config)

  return response.data
}

const documentService = {
  getDocuments,
  setDocument,
  updateDocument,
  deleteDocument,
}

export default documentService

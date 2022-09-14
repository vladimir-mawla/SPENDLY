import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import documentService from "./documentService"

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Set document for a transaction
export const setDocument = createAsyncThunk(
  "document/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await documentService.setDocument(formData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get documents for a transaction
export const getDocuments = createAsyncThunk(
  "document/getAll",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await documentService.getDocuments(params.model, params.id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete document
export const deleteDocument = createAsyncThunk(
  "document/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await documentService.deleteDocument(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update document
export const updateDocument = createAsyncThunk(
  "document/update",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await documentService.updateDocument(formData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Side effects
      .addCase(setDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data.push(action.payload)
      })
      .addCase(setDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Side effects
      .addCase(getDocuments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Delete Side effects
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.filter((doc) => doc._id !== action.payload.id)
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update Side effects
      .addCase(updateDocument.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.map((doc) => {
          if (doc._id === action.payload._id) {
            return action.payload
          }
          return doc
        })
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = documentSlice.actions
export default documentSlice.reducer

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import incomeService from "./incomeService"

const initialState = {
  data: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Create new income
export const createIncome = createAsyncThunk(
  "income/create",
  async (incomeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.createIncome(incomeData, token)
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

// Get user incomes
export const getIncomes = createAsyncThunk(
  "income/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.getIncomes(token)
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

// Delete user income
export const deleteIncome = createAsyncThunk(
  "income/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.deleteIncome(id, token)
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

// Update user income
export const updateIncome = createAsyncThunk(
  "income/update",
  async (incomeData, thunkAPI) => {
    try {
      const id = incomeData.id
      delete incomeData.id
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.updateIncome(id, incomeData, token)
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

// Upload income data
export const uploadData = createAsyncThunk(
  "income/import",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.uploadData(formData, token)
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

// Export income data
export const exportData = createAsyncThunk(
  "income/export",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await incomeService.exportData(token)
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

export const incomeSlice = createSlice({
  name: "income",
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
      .addCase(createIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data.push(action.payload)
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Side effects
      .addCase(getIncomes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getIncomes.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getIncomes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Delete Side effects
      .addCase(deleteIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.filter(
          (income) => income._id !== action.payload.id
        )
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Update Side effects
      .addCase(updateIncome.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = state.data.map((income) => {
          if (income._id === action.payload._id) {
            return action.payload
          }
          return income
        })
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Upload Side effects
      .addCase(uploadData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        action.payload.incomes.forEach((record) => {
          state.data.push(record)
        })
      })
      .addCase(uploadData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Export Side effects
      .addCase(exportData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(exportData.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(exportData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = incomeSlice.actions
export default incomeSlice.reducer

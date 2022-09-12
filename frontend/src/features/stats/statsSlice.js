import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import statsService from "./statsService"

const initialState = {
  data: {},
  publicUser: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Get Public stats
export const getPublic = createAsyncThunk(
  "Stats/public",
  async (_, thunkAPI) => {
    try {
      return await statsService.getPublic()
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

// Get user stats
export const getUserStats = createAsyncThunk(
  "Stats/private",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await statsService.getUserStats(token)
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

// Get user stats
export const getDiscoverUsers = createAsyncThunk(
  "Stats/discover",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await statsService.getDiscoverUsers(token)
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

// Get public user info
export const getPublicUserInfo = createAsyncThunk(
  "Stats/public/user",
  async (id, thunkAPI) => {
    try {
      return await statsService.getPublicUserInfo(id)
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

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.data = {}
      state.publicUser = {}
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Public effects
      .addCase(getPublic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPublic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.data = action.payload
      })
      .addCase(getPublic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get User effects
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Public Users
      .addCase(getDiscoverUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDiscoverUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(getDiscoverUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get Public User Info
      .addCase(getPublicUserInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPublicUserInfo.fulfilled, (state, action) => {
        state.isLoading = false
        state.publicUser = action.payload
      })
      .addCase(getPublicUserInfo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = statsSlice.actions
export default statsSlice.reducer

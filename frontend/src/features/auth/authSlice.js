import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user: user ? user : null,
  profile: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// SignUp user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Update user
export const update = createAsyncThunk(
  "auth/update",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      return await authService.update(userData, token)
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

// Get current user
export const getCurrent = createAsyncThunk(
  "auth/get/me",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      let res = await authService.getCurrent(token)
      return thunkAPI.fulfillWithValue(res)
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout()
})

// Request forgot password
export const forgotPass = createAsyncThunk(
  "auth/request.reset",
  async (userData, thunkAPI) => {
    try {
      let res = await authService.forgotPass(userData)
      return thunkAPI.fulfillWithValue(res.message)
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

// Reset password
export const resetPass = createAsyncThunk(
  "auth/reset",
  async (userData, thunkAPI) => {
    try {
      let res = await authService.resetPass(userData)
      return thunkAPI.fulfillWithValue(res.message)
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

// Reset password
export const uploadProfilePic = createAsyncThunk(
  "auth/upload",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken
      let res = await authService.uploadProfilePic(formData, token)
      return thunkAPI.fulfillWithValue(res)
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
      state.profile = {}
    },
    resetLoaders: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Side effects
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      // Login Side effects
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      // Logout Side effect
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      // Update Side effects
      .addCase(update.pending, (state) => {
        state.isLoading = true
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        state.message = "Profile Updated"
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // getCurrent Side effects
      .addCase(getCurrent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrent.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
      })
      .addCase(getCurrent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Reset Pass Side effects
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Request reset Pass Side effects
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Request reset Pass Side effects
      .addCase(uploadProfilePic.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        state.message = "Profile Updated"
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetLoaders } = authSlice.actions
export default authSlice.reducer

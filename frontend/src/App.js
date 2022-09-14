import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import theme from "./helpers/theme"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Income from "./pages/Income"
import Expenses from "./pages/Expenses"
import Profile from "./pages/Profile"
import Discover from "./pages/Discover"
import MainLayout from "./layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Documents from "./pages/Documents"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Spinner from "./components/Spinner"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Spinner />
      <ToastContainer />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route index path="/" element={<Home />} />

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
          </Route>

          {/* Private Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/documents/:type/:id" element={<Documents />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/discover" element={<Discover />} />
            </Route>
          </Route>

          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

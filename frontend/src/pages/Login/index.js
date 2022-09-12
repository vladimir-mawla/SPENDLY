import {
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    Box,
  } from "@mui/material"
  import { useFormik } from "formik"
  import { Link, useNavigate } from "react-router-dom"
  import { useEffect } from "react"
  import { useSelector, useDispatch } from "react-redux"
  import { login, reset } from "../../features/auth/authSlice"
  import { toast } from "react-toastify"
  import { loginSchema } from "../../validators/userValidator"
  
  const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess || user) {
        navigate("/dashboard")
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        dispatch(login(values))
      },
    })
  
    return (
      <>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ margin: "10px 0 20px 0" }}
          >
            Sign In
          </Typography>
  
          <Typography variant="p" fontWeight="light" fontSize="small">
            New User ?
          </Typography>
  
          <Button
            variant="text"
            component={Link}
            to="/sign-up"
            size="small"
            sx={{ width: "auto" }}
          >
            Create Account
          </Button>
        </Box>
  
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
  
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginTop: "20px" }}
          />
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="text"
              component={Link}
              to="/forgot-password"
              size="small"
              sx={{ width: "auto", margin: "10px 0 0 0" }}
            >
              Forgot Password ?
            </Button>
          </Grid>
          <Divider />
          <Button color="primary" variant="contained" type="submit">
            Sign In
          </Button>
        </form>
      </>
    )
  }
  
  export default Login
  
import {
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    Box,
    Tooltip,
  } from "@mui/material"
  import { useFormik } from "formik"
  import { Link, useNavigate } from "react-router-dom"
  import { useEffect } from "react"
  import { useSelector, useDispatch } from "react-redux"
  import { register, reset } from "../../features/auth/authSlice"
  import { toast } from "react-toastify"
  import { registerSchema } from "../../validators/userValidator"
  
  const SignUp = () => {
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
        orgName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPass: "",
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
        dispatch(register(values))
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
            Sign Up
          </Typography>
  
          <Typography variant="p" fontWeight="light" fontSize="small">
            Already a User ?
          </Typography>
  
          <Button
            variant="text"
            component={Link}
            to="/login"
            size="small"
            sx={{ width: "auto" }}
          >
            Login
          </Button>
        </Box>
  
        <form onSubmit={formik.handleSubmit}>
          <Tooltip title="Your Organization's Name Cannot Be Changed Later">
            <TextField
              fullWidth
              id="orgName"
              name="orgName"
              label="NGO Name"
              type="text"
              value={formik.values.orgName}
              onChange={formik.handleChange}
              error={formik.touched.orgName && Boolean(formik.errors.orgName)}
              helperText={formik.touched.orgName && formik.errors.orgName}
            />
          </Tooltip>
  
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={0}
          >
            <TextField
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ margin: "10px 2px 0 0", width: "45%" }}
            />
            <TextField
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ margin: "10px 0 0 2px", width: "45%" }}
            />
          </Grid>
  
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginTop: "10px" }}
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
            sx={{ marginTop: "10px" }}
          />
          <TextField
            fullWidth
            id="confirmPass"
            name="confirmPass"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPass && Boolean(formik.errors.confirmPass)
            }
            helperText={formik.touched.confirmPass && formik.errors.confirmPass}
            sx={{ marginTop: "10px" }}
          />
          <Divider />
          <Button color="primary" variant="contained" type="submit">
            Sign In
          </Button>
        </form>
      </>
    )
  }
  
  export default SignUp
  
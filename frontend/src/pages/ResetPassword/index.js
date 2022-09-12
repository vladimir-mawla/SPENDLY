import {
    Button,
    Divider,
    Grid,
    TextField,
    Typography,
    Box,
  } from "@mui/material"
  import { useFormik } from "formik"
  import { Link, useNavigate, useSearchParams } from "react-router-dom"
  import { useEffect } from "react"
  import { useSelector, useDispatch } from "react-redux"
  import { resetPass, reset } from "../../features/auth/authSlice"
  import { toast } from "react-toastify"
  import { resetPassSchema } from "../../validators/userValidator"
  
  const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const [params, setParams] = useSearchParams()
  
    const token = params.get("token")
    const id = params.get("id")
  
    const { user, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (!token || !id) {
        navigate("/")
      }
  
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess) {
        toast.success(message)
      }
  
      dispatch(reset())
    }, [token, id, user, isError, isSuccess, message, navigate, dispatch])
  
    const formik = useFormik({
      initialValues: {
        password: "",
        confirmPass: "",
      },
      validationSchema: resetPassSchema,
      onSubmit: (values) => {
        dispatch(
          resetPass({
            token: token,
            password: values.password,
            userId: id,
          })
        )
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
            Reset Your Password
          </Typography>
        </Box>
  
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="New Password"
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
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="text"
              component={Link}
              to="/login"
              size="small"
              sx={{ width: "auto", margin: "10px 0 0 0" }}
            >
              Login
            </Button>
          </Grid>
          <Divider />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </>
    )
  }
  
  export default ResetPassword
  
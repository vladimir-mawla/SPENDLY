import { Button, Divider, TextField, Typography, Box } from "@mui/material"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { forgotPass, reset } from "../../features/auth/authSlice"
import { toast } from "react-toastify"
import { forgotPassSchema } from "../../validators/userValidator"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassSchema,
    onSubmit: (values) => {
      dispatch(forgotPass(values))
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
          Forgot Password?
        </Typography>

        <Typography variant="p" fontWeight="light" fontSize="small">
          Enter the email address you used when you joined and we'll send you
          instructions to reset your password. For security reasons, we do NOT
          store your password. So rest assured that we will never send your
          password via email.
        </Typography>
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

        <Divider />
        <Button color="primary" variant="contained" type="submit">
          Send Reset Instructions
        </Button>
      </form>
    </>
  )
}

export default ForgotPassword

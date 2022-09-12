import {
    Button,
    Typography,
    TextField,
    Divider,
    Grid,
    Tooltip,
    FormControlLabel,
    Switch,
    FormControl,
    FormGroup,
    FormHelperText,
    Avatar,
  } from "@mui/material"
  import { useEffect } from "react"
  import { useSelector, useDispatch } from "react-redux"
  import { useFormik } from "formik"
  import {
    update,
    resetLoaders,
    uploadProfilePic,
  } from "../../features/auth/authSlice"
  import { useNavigate } from "react-router-dom"
  import { toast } from "react-toastify"
  import { profileSchema } from "../../validators/userValidator"
  import FileUploadIcon from "@mui/icons-material/FileUpload"
  
  const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const { profile, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (!profile || Object.keys(profile).length === 0) {
        navigate("/dashboard")
      }
    })
  
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        websiteAddress: "",
        country: "",
        city: "",
        phone: "",
        about: "",
        settings: {
          emailExports: true,
          publicVisibility: true,
        },
      },
      validationSchema: profileSchema,
      onSubmit: (values) => {
        dispatch(update(values))
      },
    })
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess) {
        toast.success(message)
      }
  
      formik.setValues(
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          websiteAddress: profile.websiteAddress,
          country: profile.country,
          city: profile.city,
          phone: profile.phone,
          about: profile.about,
          settings: profile.settings,
        },
        false
      )
  
      dispatch(resetLoaders())
      // eslint-disable-next-line
    }, [profile, isError, isSuccess, message, navigate, dispatch])
  
    const onUpload = (event) => {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append("file", file)
      dispatch(uploadProfilePic(formData))
    }
  
    return (
      <>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" fontWeight="bold" sx={{ m: "20px 0" }}>
              Profile
            </Typography>
  
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ m: "0 0 15px 0" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={profile.logoURL}
                sx={{ width: 100, height: 100, mr: 2 }}
              />
  
              <input
                color="primary"
                accept="image/*"
                type="file"
                onChange={onUpload}
                id="icon-button-file"
                hidden
              />
              <label htmlFor="icon-button-file">
                <Button
                  fullWidth={false}
                  component="span"
                  variant="outlined"
                  size="small"
                >
                  <FileUploadIcon fontSize="small" />
                  Upload
                </Button>
              </label>
            </Grid>
  
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ width: "60vh" }}
            >
              <Tooltip title="Your Organization's Name Cannot Be Changed">
                <TextField
                  label="NGO Name"
                  type="text"
                  disabled
                  value={profile.orgName}
                />
              </Tooltip>
  
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
                sx={{ mt: "15px" }}
              >
                <Grid item md={6} xs={12}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName && Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
              <Tooltip title="Your Email Must Be Unique">
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ marginTop: "15px" }}
                />
              </Tooltip>
  
              <Grid container direction="column">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ m: "20px 0 0 0" }}
                >
                  Basic Information
                </Typography>
                <FormHelperText>
                  Add the basic information about your company
                </FormHelperText>
              </Grid>
  
              <TextField
                fullWidth
                id="websiteAddress"
                name="websiteAddress"
                label="Website Address"
                type="text"
                value={formik.values.websiteAddress}
                onChange={formik.handleChange}
                error={
                  formik.touched.websiteAddress &&
                  Boolean(formik.errors.websiteAddress)
                }
                helperText={
                  formik.touched.websiteAddress && formik.errors.websiteAddress
                }
                sx={{ marginTop: "15px" }}
              />
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                type="text"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                sx={{ marginTop: "15px" }}
              />
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                sx={{ marginTop: "15px" }}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={{ marginTop: "15px" }}
              />
  
              <Grid container direction="column">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ m: "20px 0 0 0" }}
                >
                  About
                </Typography>
                <FormHelperText>
                  Add a short description about your organization
                </FormHelperText>
              </Grid>
  
              <TextField
                fullWidth
                id="about"
                name="about"
                label="Description"
                type="text"
                multiline
                rows={3}
                value={formik.values.about}
                onChange={formik.handleChange}
                error={formik.touched.about && Boolean(formik.errors.about)}
                helperText={formik.touched.about && formik.errors.about}
                sx={{ marginTop: "15px" }}
              />
  
              <Typography variant="h6" fontWeight="bold" sx={{ m: "20px 0" }}>
                Settings
              </Typography>
  
              <FormControl component="fieldset" variant="standard" fullWidth>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={() => {
                          formik.values.settings.publicVisibility
                            ? formik.setFieldValue(
                                "settings.publicVisibility",
                                false
                              )
                            : formik.setFieldValue(
                                "settings.publicVisibility",
                                true
                              )
                        }}
                        checked={formik.values.settings.publicVisibility}
                      />
                    }
                    label="Allow Public Visibility"
                  />
                  <FormHelperText>
                    Allow users and non users to access your general information
                  </FormHelperText>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={() => {
                          formik.values.settings.emailExports
                            ? formik.setFieldValue("settings.emailExports", false)
                            : formik.setFieldValue("settings.emailExports", true)
                        }}
                        checked={formik.values.settings.emailExports}
                      />
                    }
                    label="Enable Email Exports"
                  />
                  <FormHelperText>
                    Send me an export copy via email
                  </FormHelperText>
                </FormGroup>
              </FormControl>
  
              <Divider />
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ marginTop: "15px" }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth={false}
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </>
    )
  }
  
  export default Profile
  
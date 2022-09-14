import { Button, Grid, Typography, Box } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import useStyles from "./style"
import financeLogo from "../../assests/financeLogo.png"

const AuthLayout = ({ children }) => {
  const navigate = useNavigate()
  const classes = useStyles()

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item md={5} xs={12} className={classes.left}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "90vh" }}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h4" className={classes.title} alignSelf="self-end">
                SPENDLY
              </Typography>

            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.text}>
                Track all your expenses
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={5} xs={12} className={classes.right}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            style={{ minHeight: "90vh" }}
          >
            <Grid item alignSelf="flex-start">
              <Box>
                <Button color="background" onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon />
                </Button>
              </Box>
            </Grid>
            {/* Children components */}
            <Grid item>
              <Outlet />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default AuthLayout

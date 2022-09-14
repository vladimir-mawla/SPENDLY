import { Divider, Grid, Paper, Typography } from "@mui/material"
import useStyles from "./style"

const Footer = () => {
  const classes = useStyles()

  return (
    <Paper id="aboutus">
      <Typography component="p" className={classes.bottom}>
        © 2021-2022 All Rights Reserved.
      </Typography>
    </Paper>
  )
}

export default Footer

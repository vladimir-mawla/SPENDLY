import { Grid, Typography } from "@mui/material"
import DiscoverTable from "../../DiscoverTable"
import { useTheme } from "@mui/styles"

const Ngos = (props) => {
  const { data } = props

  const theme = useTheme()

  if (!data.users) {
    return null
  }
  return (
    <div id="ngo">
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ padding: "30px" }}
      >
        <Grid item md={6} xs={12}>
          <Typography
            variant="h6"
            textAlign="center"
            p={5}
            color={theme.palette.background.darker}
           
          >
            Recently Registered
          </Typography>
          <DiscoverTable rows={data.users.recent}></DiscoverTable>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography
            variant="h6"
            textAlign="center"
            p={5}
            color={theme.palette.background.darker}

          >
            Highest Income
          </Typography>
          <DiscoverTable rows={data.users.highestIncome}></DiscoverTable >
        </Grid>
      </Grid>
    </div>
  )
}

export default Ngos

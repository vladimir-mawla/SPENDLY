import { Paper, Container, Typography, Grid, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <Paper id="back-to-top-anchor" >
      <Container maxWidth="true">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={0}
          sx={{ minHeight: "90vh" }}
        >
          <Typography variant="h6" sx={{ margin: "30px" }}>
            EXPENSE TRACKER
          </Typography>
          <Typography variant="h2" textAlign="center" sx={{ margin: "30px" }}>
          It takes seconds to record daily transactions. Put them into clear and visualized categories as Expenses and Income.
          </Typography>
          <Button
            component={Link}
            to="/sign-up"
            fullWidth={false}
            variant="contained"
            sx={{ margin: "30px" }}
          >
            SIGN UP
          </Button>
        </Grid>
      </Container>
    </Paper>
  )
}

export default Welcome

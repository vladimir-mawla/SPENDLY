import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getUserStats } from "../../features/stats/statsSlice"
import BarChart from "../../components/BarChart"
import PaidIcon from "@mui/icons-material/Paid"
import AddCardIcon from "@mui/icons-material/AddCard"
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox"
import SummarizeIcon from "@mui/icons-material/Summarize"

const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserStats())
  }, [])

  const { data } = useSelector((state) => state.stats)

  const { profile } = useSelector((state) => state.auth)

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ padding: "30px" }}
        spacing={2}
      >
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <SummarizeIcon fontSize="large" color="green" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="left">
                    Tracked Transactions
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" textAlign="left" color="black" mt="5%">
                {profile.transactions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <MoveToInboxIcon fontSize="large" color="yellow" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="left">
                    Total Income
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" textAlign="left" color="black" mt="5%">
                $ {profile.totalIncome}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <PaidIcon fontSize="large" color="orange" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="left">
                    Total Expenses
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" textAlign="left" color="black" mt="5%">
                $ {profile.totalExpenses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <AddCardIcon fontSize="large" color="info" />
                </Grid>
                <Grid item>
                  <Typography variant="h6" textAlign="left">
                    Remaining Budget
                  </Typography>
                </Grid>
              </Grid>

              <Typography variant="h5" textAlign="left" color="black" mt="5%">
                $ {profile.totalIncome - profile.totalExpenses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ padding: "30px" }}
      >
        <Grid item xs={12} md={6}>
          <BarChart title="Income Report" dataSets={data.incomes} />
        </Grid>

        <Grid item xs={12} md={6}>
          <BarChart title="Expenses Report" dataSets={data.expenses} />
        </Grid>
      </Grid>
    </>
  )
}
export default Dashboard

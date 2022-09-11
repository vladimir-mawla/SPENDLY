import { getPublicUserInfo } from "../../features/stats/statsSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import {
  Typography,
  TextField,
  DialogContent,
  Divider,
  Grid,
} from "@mui/material"
import { format, parseISO } from "date-fns"
import { withStyles } from "@mui/styles"
import { toast } from "react-toastify"

const InfoDialog = ({ id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPublicUserInfo(id))
  }, [])

  const { publicUser, isError, isSuccess, message } = useSelector((state) => state.stats)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

  }, [publicUser, isError, isSuccess, message, id, dispatch])

  if (!publicUser.orgName) {
    return null
  }

  const CustomTextField = withStyles({
    root: {
      margin: "8px",
    },
  })(TextField)

  return (
    <DialogContent>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
        Name: {publicUser.orgName}
      </Typography>

      <Divider />

      <CustomTextField label="Country" type="text" value={publicUser.country} />

      <CustomTextField label="City" type="text" value={publicUser.city} />

      <CustomTextField label="Phone" type="text" value={publicUser.phone} />

      <CustomTextField
        label="Joined On"
        type="text"
        value={format(parseISO(publicUser.createdAt), "MM/dd/yyyy")}
      />

      <CustomTextField
        label="Total Income"
        type="text"
        value={"$" + publicUser.totalIncome}
      />

      <CustomTextField
        label="Total Expenses"
        type="text"
        value={"$" + publicUser.totalExpenses}
      />

      <Grid container direction="column">
        <CustomTextField
          label="About"
          type="text"
          multiline
          rows={3}
          value={publicUser.about}
        />

        <CustomTextField
          label="Web Address"
          type="text"
          value={publicUser.websiteAddress}
        />
      </Grid>
    </DialogContent>
  )
}
export default InfoDialog

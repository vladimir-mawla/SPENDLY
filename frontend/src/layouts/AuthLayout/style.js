import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  left: {
    padding: "10px",
    backgroundColor: theme.palette.background.main,
    color: "white",
  },
  right: {
    padding: "10px",
    backgroundColor: "white",
    color: theme.palette.background.main,
  },
  title: {
    fontWeight: "bolder",
    textAlign: "center",
    textTransform: "uppercase",
    fontStyle: "italic",
    paddingBottom: "30px",
  },
  text: {
    fontWeight: "medium",
    textAlign: "center",
    textTransform: "none",
  },
}))

export default useStyles

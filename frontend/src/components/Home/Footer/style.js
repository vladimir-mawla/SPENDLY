import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
  },
  divider: {
    backgroundColor: theme.palette.background.darker,
  },
  bottom: {
    padding: "10px 30px",
    color: theme.palette.background.darker,
    fontSize: "small",
    marginLeft: "8%",
  },
}))

export default useStyles

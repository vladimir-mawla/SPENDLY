import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "100%",
    marginBottom: 10,
    color: "black",
    backgroundColor: "white",
    border: "0.1px solid #CCC",
    borderRadius: " 5px",
  },
  actnsBtn: { 
    borderRadius: "5px" 
  },
  left: {
    borderRadius: "5px 0 0 5px",
  },
  right: {
    borderRadius: "0 5px 5px 0",
  },
}))

export default useStyles

import {
  Paper,
  Table,
  TableHead,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Dialog,
  Avatar,
} from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"
import InfoDialogue from "../InfoDialogue"
import { useState } from "react"
import useStyles from "./style"

const getInitials = (user) => {
  const first = user.firstName
    ? user.firstName.substring(0, 1).toUpperCase()
    : "U"
  const last = user.lastName
    ? user.lastName.substring(0, 1).toUpperCase()
    : "N"
  return first + last
}

export default function DiscoverTable(props) {
  const [Open, setOpen] = useState(false)
  const [Id, setId] = useState(0)
  const classes = useStyles()

  const { rows } = props

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={Open} onClose={handleClose}>
        <InfoDialogue id={Id} />
      </Dialog>
      <Paper
        className={classes.tableContainer}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">NGO Name</TableCell>
                <TableCell align="center">Country</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Total Income</TableCell>
                <TableCell align="center">Total Expenses</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.orgName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {!row.logoURL ? (
                      <Avatar>{getInitials(row)}</Avatar>
                    ) : (
                      <Avatar src={row.logoURL}></Avatar>
                    )}
                  </TableCell>
                  <TableCell align="left">{row.orgName}</TableCell>
                  <TableCell align="center">{row.country}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">$ {row.totalIncome}</TableCell>
                  <TableCell align="center">$ {row.totalExpenses}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Check Info">
                      <IconButton
                        aria-label="info"
                        onClick={() => {
                          setId(row._id)
                          handleClickOpen()
                        }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

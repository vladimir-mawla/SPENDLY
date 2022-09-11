import { useState } from "react"
import {
    Paper,
    Box,
    ButtonGroup,
    Button,
    Table,
    TableContainer,
    TablePagination,
    TableBody,
    TableRow,
    TableCell,
    Grid,
    Link,
} from "@mui/material"
import TableHeader from "../TableHeader"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import { format, parseISO } from "date-fns"
import { useNavigate } from "react-router-dom"
import useStyles from "./style"

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

const getComparator = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const capitalize = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
}

export default function DataTable(props) {
    const [order, setOrder] = useState("desc")
    const [orderBy, setOrderBy] = useState("createdAt")
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const classes = useStyles()
    const navigate = useNavigate()

    const {
        rows,
        onDelete,
        onEdit,
        type,
        importData,
        exportData,
        addNew,
        headCells,
        isDocument,
    } = props

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc"
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                direction="column"
                alignItems="flex-end"
                justifyContent="center"
                sx={{ mb: "5px" }}
            >
                <Button
                    variant="contained"
                    size="medium"
                    fullWidth={false}
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    onClick={(event) => addNew(event)}
                >
                    <AddIcon fontSize="small" />
                    Add New
                </Button>
            </Grid>
            <Paper className={classes.tableContainer}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={"medium"}
                    >
                        <TableHeader
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`

                                    return (
                                        <TableRow hover tabIndex={-1} key={row._id}>
                                            <TableCell component="th" id={labelId} scope="row">
                                                {row._id}
                                            </TableCell>
                                            {isDocument ? (
                                                <>
                                                    <TableCell align="left">
                                                        <Link href={row.document} underline="hover">
                                                            Download
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="left">{row.notes}</TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell align="left">
                                                        {capitalize(row.type)}
                                                    </TableCell>
                                                    <TableCell align="left">$ {row.amount}</TableCell>
                                                </>
                                            )}

                                            <TableCell align="left">
                                                {format(parseISO(row.date), "MM/dd/yyyy")}
                                            </TableCell>
                                            <TableCell align="left">
                                                {format(parseISO(row.createdAt), "MM/dd/yyyy")}
                                            </TableCell>
                                            <TableCell align="left">
                                                {format(parseISO(row.updatedAt), "MM/dd/yyyy")}
                                            </TableCell>
                                            <TableCell align="center">
                                                <ButtonGroup
                                                    variant="outlined"
                                                    size="small"
                                                    aria-label="outlined primary button group"
                                                >
                                                    {isDocument ? null : (
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            className={classes.actnsBtn}
                                                            onClick={() =>
                                                                navigate(`/documents/${type}/${row._id}`)
                                                            }
                                                        >
                                                            Documents
                                                        </Button>
                                                    )}

                                                    <Button
                                                        className={classes.actnsBtn}
                                                        color="secondary"
                                                        onClick={(event) => onEdit(event, row._id)}
                                                    >
                                                        <EditIcon fontSize="small" />
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className={classes.actnsBtn}
                                                        color="danger"
                                                        onClick={(event) => onDelete(event, row._id)}
                                                    >
                                                        <DeleteOutlineIcon fontSize="small" />
                                                        Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {isDocument ? null : (
                <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    justifyContent="center"
                >
                    <ButtonGroup
                        variant="contained"
                        size="medium"
                        aria-label="outlined primary button group"
                    >
                        <input
                            color="primary"
                            accept=".csv"
                            type="file"
                            onChange={importData}
                            id="icon-button-file"
                            style={{ display: "none" }}
                        />
                        <label htmlFor="icon-button-file">
                            <Button className={classes.left} component="span">
                                <FileUploadIcon fontSize="small" />
                                Import
                            </Button>
                        </label>
                        <Button className={classes.right} onClick={exportData}>
                            <FileDownloadIcon fontSize="small" />
                            Export
                        </Button>
                    </ButtonGroup>
                </Grid>
            )}
        </Box>
    )
}

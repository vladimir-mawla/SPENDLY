import { useParams } from "react-router-dom"
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Box,
} from "@mui/material"
import DataTable from "../../components/DataTable"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useFormik } from "formik"
import {
  setDocument,
  getDocuments,
  deleteDocument,
  updateDocument,
  reset,
} from "../../features/document/documentSlice"
import { toast } from "react-toastify"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DatePicker from "@mui/lab/DatePicker"
import FileUploadIcon from "@mui/icons-material/FileUpload"
import { useNavigate } from "react-router-dom"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { documentSchema } from "../../validators/documentValidator"

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "ID",
  },
  {
    id: "document",
    numeric: false,
    disablePadding: false,
    label: "Document",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created On",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated On",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "",
  },
]

const Documents = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id, type } = useParams()

  const model = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()

  useEffect(() => {
    dispatch(
      getDocuments({
        id: id,
        model: model,
      })
    )
  }, [])

  const { data, isError, isSuccess, message } = useSelector(
    (state) => state.document
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success("Done!")
    }

    dispatch(reset())
  }, [data, isError, isSuccess, message, dispatch])

  const AddForm = useFormik({
    initialValues: {
      model: model,
      transactionId: id,
      notes: "",
      date: new Date().toISOString(),
      file: null,
    },
    validationSchema: documentSchema,
    onSubmit: (values) => {
      if (!values.file) {
        toast.error("A document is required")
        return
      }
      const formData = new FormData()
      formData.append("file", values.file)
      formData.append("model", values.model)
      formData.append("transactionId", values.transactionId)
      formData.append("notes", values.notes)
      formData.append("date", values.date)
      dispatch(setDocument(formData))
      AddForm.resetForm()
      setAddOpen(false)
    },
  })

  const EditForm = useFormik({
    initialValues: {
      id: 0,
      notes: "",
      date: new Date().toISOString(),
      file: null,
    },
    validationSchema: documentSchema,
    onSubmit: (values) => {
      if (!values.file) {
        toast.error("A document is required")
        return
      }
      const formData = new FormData()
      formData.append("file", values.file)
      formData.append("id", values.id)
      formData.append("notes", values.notes)
      formData.append("date", values.date)

      dispatch(updateDocument(formData))
      EditForm.resetForm()
      setEditOpen(false)
    },
  })

  const handleAddClickOpen = () => {
    setAddOpen(true)
  }
  const handleAddClose = () => {
    setAddOpen(false)
    AddForm.resetForm()
  }
  const handleEditClickOpen = (event, id) => {
    let record = data.filter((obj) => {
      return obj._id === id
    })[0]

    EditForm.setFieldValue("id", record._id)
    EditForm.setFieldValue("notes", record.notes)
    EditForm.setFieldValue("date", record.date)
    setEditOpen(true)
  }
  const handleEditClose = () => {
    setEditOpen(false)
  }

  const onDelete = (event, id) => {
    dispatch(deleteDocument(id))
  }

  return (
    <>
      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Add a new document
          </Typography>
          <form onSubmit={AddForm.handleSubmit}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={AddForm.values.date}
                  onChange={(value) => {
                    AddForm.setFieldValue("date", value)
                  }}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              fullWidth
              sx={{ marginTop: "20px" }}
              multiline
              rows={3}
              id="notes"
              name="notes"
              label="Notes"
              type="text"
              value={AddForm.values.notes}
              onChange={AddForm.handleChange}
              error={AddForm.touched.notes && Boolean(AddForm.errors.notes)}
              helperText={AddForm.touched.notes && AddForm.errors.notes}
            />

            <input
              color="primary"
              type="file"
              onChange={(event) =>
                AddForm.setFieldValue("file", event.target.files[0])
              }
              id="icon-button-file"
              hidden
            />
            <label htmlFor="icon-button-file">
              <Button
                sx={{ marginTop: "20px" }}
                component="span"
                variant="outlined"
              >
                <FileUploadIcon fontSize="small" />
                Upload
              </Button>
            </label>

            <Divider />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Button onClick={handleAddClose}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: "20px" }}>
            Edit document
          </Typography>
          <form onSubmit={EditForm.handleSubmit}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Date"
                  value={EditForm.values.date}
                  onChange={(value) => {
                    EditForm.setFieldValue("date", value)
                  }}
                />
              </LocalizationProvider>
            </Box>

            <TextField
              fullWidth
              sx={{ marginTop: "20px" }}
              multiline
              rows={3}
              id="notes"
              name="notes"
              label="Notes"
              type="text"
              value={EditForm.values.notes}
              onChange={EditForm.handleChange}
              error={EditForm.touched.notes && Boolean(EditForm.errors.notes)}
              helperText={EditForm.touched.notes && EditForm.errors.notes}
            />

            <input
              color="primary"
              type="file"
              onChange={(event) =>
                EditForm.setFieldValue("file", event.target.files[0])
              }
              id="icon-button-file"
              hidden
            />
            <label htmlFor="icon-button-file">
              <Button
                sx={{ marginTop: "20px" }}
                component="span"
                variant="outlined"
              >
                <FileUploadIcon fontSize="small" />
                Replace File
              </Button>
            </label>

            <Divider />
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <Button onClick={handleEditClose}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>

      <Grid container direction="row">
        <Button
          color="background"
          fullWidth={false}
          onClick={() => navigate(-1)}
          size="small"
        >
          <KeyboardBackspaceIcon />
        </Button>

        <Typography variant="h4" fontWeight="bold">
          Documents
        </Typography>
      </Grid>

      <DataTable
        rows={data}
        onDelete={onDelete}
        onEdit={handleEditClickOpen}
        addNew={handleAddClickOpen}
        isDocument={true}
        headCells={headCells}
      />
    </>
  )
}
export default Documents

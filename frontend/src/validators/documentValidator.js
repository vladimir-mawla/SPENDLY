import * as yup from "yup"

const documentSchema = yup.object({
  notes: yup.string("Enter your notes"),
  date: yup.date("Enter the date"),
})

export { documentSchema }

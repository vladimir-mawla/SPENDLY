import * as yup from "yup"

const requiredMsg = "This field is required"

const transactionSchema = yup.object({
  type: yup.string("Enter the type").required(requiredMsg).lowercase().trim(),
  amount: yup
    .number("Enter the amount")
    .required(requiredMsg)
    .moreThan(0, "Amount should be atleast 1$"),
  date: yup.date("Enter the date"),
})

export { transactionSchema }

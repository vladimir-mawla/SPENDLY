const jwt = require("jsonwebtoken")
const _ = require("lodash")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "30d" })
}

// custom setters don't work with arrow functions
function amountCustomSetter(newValue) {
  if (this.amount) {
    this.tempAmount = this.amount
  }
  return newValue
}

const padTo2Digits = (num) => {
  return num.toString().padStart(2, "0")
}

const validateImport = (source, id) => {
  let data = []
  let totalAmount = 0
  const errMsg = {
    message: "CSV data are not valid",
  }

  source.forEach((row) => {
    if (!row.Type || !row.Amount || !row.Date) {
      console.log(errMsg)
    }

    if (parseInt(row.Amount) <= 0) {
      console.log(errMsg)
    }

    const [date, month, year] = row.Date.split("/")

    const isoStr = `${year}-${padTo2Digits(month)}-${padTo2Digits(
      date
    )}T00:00:00.000Z`

    const dateParsed = new Date(Date.parse(isoStr))

    if (!(dateParsed instanceof Date) || dateParsed.toISOString() !== isoStr) {
      console.log(errMsg)
    }

    let record = {
      user: id,
      type: row.Type,
      amount: parseInt(row.Amount),
      date: isoStr,
    }

    totalAmount += record.amount
    data.push(record)
  })

  return {
    data,
    totalAmount,
  }
}

// const getJsonDiff = (curr, prev) => {
//   function changes(object, base) {
//     return _.transform(object, (result, value, key) => {
//       if (!_.isEqual(value, base[key]))
//         result[key] =
//           _.isObject(value) && _.isObject(base[key])
//             ? changes(value, base[key])
//             : value
//     })
//   }
//   return changes(curr, prev)
// }

module.exports = {
  generateToken,
  amountCustomSetter,
  validateImport,
  // getJsonDiff,
}

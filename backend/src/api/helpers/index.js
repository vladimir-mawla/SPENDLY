const _ = require("lodash")

const padToTwoDigits = (num) => {
    return num.toString().padStart(2, "0")
  }
  
const validateImport = (source, id) => {
  let data = []
  let total = 0
  const err = {
    message: "CSV data are not valid",
  }

  source.forEach((row) => {
    if (!row.Type || !row.Amount || !row.Date) {
      console.log(err)
    }

    if (parseInt(row.Amount) <= 0) {
      console.log(err)
    }

    const [date, month, year] = row.Date.split("/")

    const isoStr = `${year}-${padToTwoDigits(month)}-${padToTwoDigits(
      date
    )}T00:00:00.000Z`

    const dateParsed = new Date(Date.parse(isoStr))

    if (!(dateParsed instanceof Date) || dateParsed.toISOString() !== isoStr) {
      console.log(err)
    }

    let record = {
      user: id,
      type: row.Type,
      amount: parseInt(row.Amount),
      date: isoStr,
    }

    total += record.amount
    data.push(record)
  })

  return {
    data,
    total,
  }
}

module.exports = {
  validateImport,
}

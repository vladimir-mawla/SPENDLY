const _ = require("lodash")
const LogSchema = require("../models/logModel")
// const { getJsonDiff } = require("../helpers/common")

const loggingPlugin = function (schema) {
  schema.post("init", (doc) => {
    doc._original = doc.toObject({ transform: false })
  })
  schema.pre("save", function (next) {
    if (this.isNew) {
      next()
    } else {
      // this._diff = getJsonDiff(this, this._original)
      this._diff = this
      next()
    }
  })

  schema.methods.logging = function (data) {
    data.diff = {
      before: this._original,
      after: this._diff,
    }
    return LogSchema.create(data)
  }
}

const log = async (req, res, model) => {
  const data = {
    method: req.method,
    endpoint: req.originalUrl,
    statusCode: res.statusCode,
    createdBy: req.user.id,
  }

  await model.logging(data)
}

module.exports = { loggingPlugin, log }

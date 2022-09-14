const mongoose = require("mongoose")

const LogSchema = mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diff: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
)

LogSchema.index({ createdBy: 1, endpoint: 1 })

module.exports = mongoose.model("Log", LogSchema)

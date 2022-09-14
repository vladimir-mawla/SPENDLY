const aws = require("aws-sdk")
const multer = require("multer")
const multerS3 = require("multer-s3")
const path = require("path")

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true)
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false)
  }
}

const upload = multer({
  // fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" })
    },
    key: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          "_" +
          Date.now().toString() +
          path.extname(file.originalname)
      )
    },
  }),
})

module.exports = { upload }
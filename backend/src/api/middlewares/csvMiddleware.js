const multer = require('multer')
const path = require('path')

const Storage = multer.diskStorage({
    // Destination to store files     
    destination: './src/api/static', 
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now() 
                + path.extname(file.originalname))
            // file.fieldname is name of the field 
            // path.extname get the uploaded file extension
    }
});

const importCSV = multer({
    storage: Storage,

    //  set a size limit for file uploads
    // limits: {
    //   fileSize: 1000000 // 1000000 Bytes = 1 MB
    // },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) { 
            // upload only csv format
            return cb(new Error('Please upload a CSV file'))
        }
        cb(undefined, true)
    }
}) 


module.exports = {
    importCSV
} 
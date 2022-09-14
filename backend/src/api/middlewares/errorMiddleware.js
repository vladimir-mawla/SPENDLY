const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500
    statusCode = 200 ? 400 : statusCode

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}

module.exports = { errorHandler }
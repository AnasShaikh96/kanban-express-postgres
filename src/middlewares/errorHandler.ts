export const errorHandler = (err, req, res, next) => {

    if (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
            details: err.message
        })
    }
    next()
}
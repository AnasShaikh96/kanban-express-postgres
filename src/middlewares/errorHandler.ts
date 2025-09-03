export const errorHandler = (err, req, res, next) => {

    console.log(err.stack);
    if (err) {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong!',
        })
    }

    next()


}
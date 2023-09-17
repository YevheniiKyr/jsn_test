const NotFoundException = require("../exceptions/NotFoundException");
const ValidationException = require("../exceptions/ValidationException");


 errorHandler = (error, req, res, next) => {
    if (error instanceof NotFoundException) {
        return res.status(error.status).json({ message: error.message });
    }
    if (error instanceof ValidationException) {
        return res.status(400).send({
            message: error.message,
        });
    } else {
        // Call next(error) to pass the error to the next middleware (e.g., the default error handler)
        next(error);
    }
}

module.exports = errorHandler;


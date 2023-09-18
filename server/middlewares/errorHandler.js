const NotFoundException = require("../exceptions/NotFoundException");
const ValidationException = require("../exceptions/ValidationException");


 errorHandler = (error, req, res, next) => {
    if (error instanceof NotFoundException) {
        return res.status(error.status).json({ error: error.message });
    }
    if (error instanceof ValidationException) {
        return res.status(400).send({
            error: error.message,
        });
    } else {
        return res.status(500).json({error: error.message})
        // Call next(error) to pass the error to the next middleware (e.g., the default error handler)
        // next(error);
    }
}

module.exports = errorHandler;


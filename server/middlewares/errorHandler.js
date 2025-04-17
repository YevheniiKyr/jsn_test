const NotFoundException = require("../exceptions/NotFoundException");
const ValidationException = require("../exceptions/ValidationException");
const CantCreateException = require("../exceptions/CantCreateException");
const ParamsNotPassed = require("../exceptions/ParamsNotPassed");
const CloudinaryDeleteException = require("../exceptions/CloudinaryDeleteException");
const CloudinaryUploadException = require("../exceptions/CloudinaryUploadException");


errorHandler = (error, req, res, next) => {
    if (error instanceof NotFoundException) {
        return res.status(error.status).json({
            error: error.message
        });
    }
    if (error instanceof ValidationException) {
        return res.status(400).send({
            error: error.message,
        });
    }
    if (error instanceof CantCreateException) {
        return res.status(400).json({
            error: error.message
        });
    }
    if (error instanceof ParamsNotPassed) {
        return res.status(400).json({
            error: error.message
        });
    }
    if(error instanceof CloudinaryDeleteException) {
        return res.status(400).json({
            error: error.message
        });
    }
    if(error instanceof CloudinaryUploadException) {
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(500).json({error: error.message})
}

module.exports = errorHandler;


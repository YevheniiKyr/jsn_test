import NotFoundException from "../exceptions/NotFoundException";
import ValidationException from "../exceptions/ValidationException";

const errorHandler = (error, req, res) => {
    if (error instanceof NotFoundException) {
        return res.status(error.status).json({message: error.message});
    }
    if (error instanceof ValidationException) {
        return res.status(400).send({
            message: error.message,
        });
    } else return res.status(500).json({message: error.message});
};

export default errorHandler;

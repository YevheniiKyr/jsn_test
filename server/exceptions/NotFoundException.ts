class NotFoundException extends Error {
    status;

    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;
    }
}

export default NotFoundException;

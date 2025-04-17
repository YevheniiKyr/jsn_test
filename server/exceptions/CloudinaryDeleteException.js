class CloudinaryDeleteException extends Error {

    constructor(message) {
        super(message);
        this.name = "CloudinaryUploadException";
    }
}

module.exports = CloudinaryDeleteException;

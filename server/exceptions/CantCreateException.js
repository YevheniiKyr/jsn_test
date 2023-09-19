class CantCreateException extends Error {

    constructor(message) {
        super(message);
        this.name = "CantCreateError";
    }
}

module.exports = CantCreateException;

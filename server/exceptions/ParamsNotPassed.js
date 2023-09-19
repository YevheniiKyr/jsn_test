class ParamsNotPassed extends Error {
    params

    constructor(message, params) {
        super(message + params);
        this.name = "ParamsNotPassedError";
        this.params = params;
    }
}

module.exports = ParamsNotPassed;

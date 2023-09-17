const ValidationException = require("../exceptions/ValidationException");
const Joi = require("joi");

const ValidateHero = (schema) => {
    return async (req, res, next) => {
        const {error, value} = await schema.validateAsync(req.body);
        const {errorFiles, valueFiles} = await Schemas.files.upload.validateAsync(req.files.images);

        if (error || errorFiles) {
            console.log('VALIDATION ERROR')
            throw new ValidationException(error.message);
        }
        console.log("we successfully validated hero")

    };
};

const Schemas = {
    hero: {
        create: Joi.object({
            nickname: Joi.string().required().min(1),
            real_name: Joi.string().required().min(1),
            origin_description: Joi.string().required().min(1),
            superpowers: Joi.array().items(Joi.string().required()).required(),
            catch_phrase: Joi.string().required().min(1),
            //errorFiles
            // images: Joi.array()
            //     .items(Joi.string().required().length(36)).required()
            // images: Joi.array().items(Joi.any()).required()
        }),
    },
    files: {
        upload: Joi.array().items(
            Joi.any()

        //     Joi.object({
        //     fieldname: Joi.string().valid('images').required(),
        //     originalname: Joi.string().required(),
        //     encoding: Joi.string().required(),
        //     mimetype: Joi.string().required(),
        //     buffer: Joi.binary().required(),
        // })

        )
    }
};

module.exports = {
    ValidateHero,
    Schemas
}

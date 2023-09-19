const ValidationException = require("../exceptions/ValidationException");
const Joi = require("joi");
const {debugLog} = require("express-fileupload/lib/utilities");

const ValidateHero = (schema) => {
    return async (req, res, next) => {
        console.log('start validate hero')
        try {
            const bodyValidationResult = await schema.validateAsync(req.body);
            if (bodyValidationResult.error) {
                throw new ValidationException(bodyValidationResult.error.details);
            }

            // Validate req.files.images using the upload schema
            const imagesValidationResult = await Schemas.files.upload.validateAsync(req.files.images);
            if (imagesValidationResult.error) {
                throw new ValidationException(imagesValidationResult.error.details);
            }
        } catch (error) {
            throw new ValidationException('Validation error' + error);
        }
        console.log("Successfully validated hero");
        next();

        console.log("we successfully validated hero")

    };
};

function validateJSONStringArray(value) {
    try {
        const parsedArray = JSON.parse(value);
        if (Array.isArray(parsedArray)) {
            return value;
        }
    } catch (error) {
        throw new ValidationException("Invalid JSON array string in field superpowers");
    }
    throw new ValidationException("Invalid JSON array string in field superpowers");
}

const Schemas = {
    hero: {
        create: Joi.object({
            nickname: Joi.string().required().min(1),
            real_name: Joi.string().required().min(1),
            origin_description: Joi.string().required().min(1),
            superpowers: Joi.any(),
            catch_phrase: Joi.string().required().min(1),
            //errorFiles
            // images: Joi.array()
            //     .items(Joi.string().required().length(36)).required()
            // images: Joi.array().items(Joi.any()).required()
        }),
    },
    files: {
        upload: Joi.any()
        // upload: Joi.array().items(
        //     Joi.any()

        //     Joi.object({
        //     fieldname: Joi.string().valid('images').required(),
        //     originalname: Joi.string().required(),
        //     encoding: Joi.string().required(),
        //     mimetype: Joi.string().required(),
        //     buffer: Joi.binary().required(),
        // })

        // )
    }
};

module.exports = {
    ValidateHero,
    Schemas
}

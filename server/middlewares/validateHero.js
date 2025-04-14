const ValidationException = require("../exceptions/ValidationException");
const Joi = require("joi");

const ValidateHero = (schema) => {
    return async (req, res, next) => {
        try {
            const bodyValidationResult = await schema.validateAsync(req.body);
            if (bodyValidationResult.error) {
                next(new ValidationException(bodyValidationResult.error.details));
            }
            if (schema === Schemas.hero.create) {
                const imagesValidationResult = await Schemas.files.create.validateAsync(req.files);
                if (imagesValidationResult.error) {
                     next(new ValidationException(imagesValidationResult.error.details));
                }
            }
            next()
        } catch (error) {
            next(new ValidationException(error))
        }
    };
};

function validateJSONStringArray(value) {
    try {
        const parsedArray = JSON.parse(value);
        if (Array.isArray(parsedArray)) {
            return value;
        }
    } catch (error) {
        throw new ValidationException("Invalid JSON array string in field superpowers")
    }
}

const Schemas = {
    hero: {
        create: Joi.object({
            nickname: Joi.string().required().min(1),
            real_name: Joi.string().required().min(1),
            origin_description: Joi.string().required().min(1),
            superpowers: Joi.any().custom(validateJSONStringArray).required(),
            catch_phrase: Joi.string().required().min(1),
        }),
        update: Joi.object({
            nickname: Joi.string().required().min(1),
            real_name: Joi.string().required().min(1),
            origin_description: Joi.string().required().min(1),
            superpowers: Joi.any().custom(validateJSONStringArray),
            catch_phrase: Joi.string().required().min(1),
            old_file_names: Joi.any()
        })
    },
    files: {
        create: Joi.object({
            images: Joi.any().required(),
        }).unknown(true),

    }
};

module.exports = {
    ValidateHero,
    Schemas
}

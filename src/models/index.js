const Joi = require('joi')

const createUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: Joi.string().required(),
        role:Joi.string().required()
    }),
    message: 'Error creating new user'
}

const loginUserSchema = {
    schema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    message: 'Error logging user'
}

const addBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required()
    }),
    message: 'Error logging user'
}
const updateBookSchema = {
    schema: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required()
    }),
    message: 'Error updating books'
}
const addUserCatalogueSchema = {
    schema: Joi.object().keys({
        userId: Joi.string().required(),
        bookId: Joi.string().required()
    }),
    message: 'Error adding books to catalogue'
}
module.exports = {
    createUserSchema,
    loginUserSchema,
    addBookSchema,
    updateBookSchema,
    addUserCatalogueSchema
}
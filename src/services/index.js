const db = require('../db')
const queries = require('../db/queries')

const { hashPassword, comparePassword, generateToken } = require('../utils')

const createUser = async body => {
    const { first_name, last_name, email, password, role } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [first_name, last_name, email, encryptedPassword, role ]
    return db.one(queries.addUser, payload)
}

const validatePassword = async(user, password) => {
    const isValid = await comparePassword(password, user.password)

    if (isValid) {
        const token = await generateToken(user, 'access')
        return { token }
    }
    return false
}
const getUser = email => db.any(queries.getUser, email)

const getAllBooks = () => db.any(queries.viewBooks)

const createBooks = async body => {
    const { title, author } = body

    const payload = [title, author]
    return db.one(queries.addBooks, payload)
}
const removeBook = id => db.any(queries.deleteBook, [id])
const addUserCatalogue = (userId, bookId) => {
    return db.one(queries.addUserCatalogue, [userId, bookId])
}
const updateBooks = async(body, id) => {
    const { title, author } = body
    //const payload = [title, author]
    return db.one(queries.updateBook, [title, author, id])
}
module.exports = {
    createUser,
    validatePassword,
    getUser,
    createBooks,
    getAllBooks,
    addUserCatalogue,
    removeBook,
    updateBooks
}
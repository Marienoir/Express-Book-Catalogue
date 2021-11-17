const { createUser, validatePassword, createBooks, getAllBooks, removeBook, updateBooks, addUserCatalogue } = require("../services")

const registerUser = async(req, res, next) => {
    try {
        const { body } = req
        const newUser  = await createUser(body)

        res.status(201).json({
            status: 'success',
            code: 201,
            message: 'User added successfully',
            data: newUser
        })
    }
    catch (err) {
        next(err)
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { user, password } = req
       
        const validated = await validatePassword(user, password)

        if (!validated) {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials',
                data: 'Error logging in user'
            })
        } else {
            res.status(201).json({
                status: 'success',
                code: 201,
                message: 'User logged in successfully',
                data: validated
            })
        }
    }
    catch (err) {
        next(err)
    }
}

const postBooks = async(req, res, next) => {
    try {
        const { body } = req
        const book  = await createBooks (body)

        res.status(201).json({
            status: 'success',
            message: 'Books added successfully',
            data: book
        })
    }
    catch (err) {
        next(err)
    }
}

const fetchAllBooks = async(req, res) => {
    try {
        const allBooks = await getAllBooks()

        res.status(200).json({
            status: 'success',
            message: 'All Books fetched successfully',
            data: allBooks
        })
    }
    catch (err) {
        next(err)
    }
}

const removeBooks = async(req, res, next) => {
    try {
        const { params:{id} } = req
        await removeBook(id)

        res.status(200).json({
            status: 'success',
            message: `Book ${id} deleted successfully`
        })
    }
    catch (err) {
        next(err)
    }
}

const updateABook = async(req, res, next) => {
    try {
        const { body, params:{id} } = req
        const updatedBook  = await updateBooks(body, id)

        res.status(200).json({
            status: 'success',
            message: 'Book updated successfully',
            data: updatedBook
        })
    }
    catch (err) {
        next(err)
    }
}

const addBookToCatalogue = async(req, res, next) => {
    try {
        const { id, bookId, book } = req
        const bookDetails = await addUserCatalogue(id, bookId)

        res.status(200).json({
            status: 'success',
            message: `Book ${bookId} added to catalogue successfully`,
            data: { ...bookDetails, book}
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = {registerUser, loginUser, postBooks, updateABook, fetchAllBooks, removeBooks, addBookToCatalogue}
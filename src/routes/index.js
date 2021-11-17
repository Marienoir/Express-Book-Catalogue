const express = require('express')
const { registerUser, loginUser, postBooks, fetchAllBooks, removeBooks, updatedBooks, updateABook, addBookToCatalogue } = require('../controller')
const {checkUserExists, verifyToken, checkBookExists} = require('../middleware')
const validateData = require('../middleware/validation')
const { createUserSchema, loginUserSchema, addBookSchema, updateBookSchema, addUserCatalogueSchema } = require('../models')

const router = express.Router()

router.post(
    '/api/users/signup',
    validateData(createUserSchema, 'body'),
    checkUserExists('register'),
    registerUser
)

router.post(
    '/api/users/login',
    validateData(loginUserSchema, 'body'),
    checkUserExists('login'),
    loginUser
)

router.post(
    '/api/admin/add-books',
    validateData(addBookSchema, 'body'),
    verifyToken('access', 'admin'),
    postBooks
)
router.get(
    '/api/users/view-books',
    verifyToken('access'), 
    fetchAllBooks
)

router.delete(
    '/api/users/remove/:id', 
    verifyToken('access', 'admin'),
    removeBooks
)

router.put(
    '/api/admin/update/:id',
    validateData(updateBookSchema, 'body'),
    verifyToken('access', 'admin'),
    updateABook
)

router.post(
    '/book-catalogue',
    validateData(addUserCatalogueSchema, 'body'),
    addBookToCatalogue
)

module.exports = router
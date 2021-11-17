const { getUser } = require("../services")
const { validateToken } = require("../utils")

const checkUserExists = (type) => async(req, res, next) => {
    try {
        const { body } = req
        const { email } = body
        const [ user ] = await getUser(email)

        if (type === 'register') {
            if (user) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'User already exists. Log in',
                    data: []
                })
            }
    
            next()
        } else {
            if (!user) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Invalid credentials',
                    data: []
                })
            }
    
            req.user = user
            req.password = body.password
            next()
        }
    }
    catch (err) {
        next(err)
    }
}
const checkBookExists = (type) => async(req, res, next) => {
    try {
        const { params: {id} } = req
        const book = await getUser(email)

        if (type === 'addBook') {
            if (!book) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Book already exists.',
                    data: []
                })
            }
    
            next()
        } 
            req.user = user
            req.password = body.password
            next()
    }
    catch (err) {
        next(err)
    }
}
const verifyToken = (type) => async(req, res, next) => {
    try {
        let token;
        type === 'access' 
        ? 
            token = req.headers['x-access-token']
        :
            token = req.query.token
    
        if (!token)
            return res.status(403).json({
                status: 'fail',
                message: 'No token provided.'
            })
        
        const tokenValidated = await validateToken(token, type)

        
        if (!tokenValidated) 
            return res.status(403).json({
                status: 'fail',
                message: 'Failed to authenticate token.'
            })
        

        const { email, user_id, user_role} = tokenValidated
         if (user_role === 'user') {
            return res.status(200).json({
                status: 'Failed',
                message: 'You are not authorized'
            })
        }
        const [authorizedUser] = await getUser(email)

        if (!authorizedUser) 
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        
        
        req.id = user_id
        next()
    }
    catch (err) {
        next(err)
    }
}
module.exports= {checkUserExists, verifyToken, checkBookExists}
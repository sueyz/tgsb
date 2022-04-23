const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {

    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
            
        }
        catch(e){
            console.log(e)
            //if an error occured return request unauthorized error
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {protect}
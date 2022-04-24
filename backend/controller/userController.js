const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const { use } = require('express/lib/application')

// @ desc Register User
// @rout Post /api/user
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const {first_name, last_name, email, password } = req.body

    if(!first_name || !last_name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists!')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    })

    // will not generate token here since only registering through admin do next
    if(user){
      
        res.status(201).json({
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email:user.email,
            api_token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @ desc Authenticate a User
// @rout Post /api/user/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    //check for user email
    const user = await User.findOneAndUpdate({email}, { last_login: Date.now() }, {new: true})

    if(user && (await bcrypt.compare(password, user.password))){

        res.status(201).json({
            api_token: generateToken(user._id),
            refreshToken:generateRefreshToken(user._id)
        })

       
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const verifyToken = asyncHandler(async (req, res) => {
    if(req.headers.authorization &&  req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]

            //Verify token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            //Get user from the decoded token
            req.user = await User.findById(decoded.id).select('-password')

            res.status(200).json({
                api_token: decoded,
                first_name: req.user.first_name,
                last_name: req.user.last_name

            })
            
        }
        catch(e){
            //if an error occured return request unauthorized error
            res.status(401)
            throw new Error('Not authorized, no token or expired')
        }
    }
})

const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.refreshToken;

    // console.log("refreshToken sini", refreshToken);

  // If token is not provided, send error message
    if (!refreshToken) {
        res.status(401)
        throw new Error('Token not found')
    }

    try {
        //Verify token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = generateToken(decoded.id)

        res.json({ accessToken });

    } catch (error) {
        
        res.status(401)
        throw new Error('Invalid token')
    }
})

// @desc get all user 
// @rout GEt /api/user/query
// @access Private
const queryAllUser = asyncHandler( async (req, res) => {
    const user =  await User.find()

    res.status(200).json({
        data: user,
        payload: 'test'
    })
})



// @desc get user data
// @rout GEt /api/user/me
// @access Private
const getMe = asyncHandler( async (req, res) => {
    const {_id, name, email} =  await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})


//GEnerate JWT
const generateToken = (id) => {
    // console.log(process.env.ACCESS_TOKEN_LIFE)
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
}

//GEnerate Refresh JWT
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    verifyToken,
    refreshToken,
    queryAllUser
}
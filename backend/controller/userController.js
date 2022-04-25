const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const { use } = require('express/lib/application')

// @ desc Register User
// @rout Post /api/user
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const {first_name, last_name, email, role } = req.body

    const password = 'tgsb1234'

    if(!first_name || !last_name || !email ){
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
        role,
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

            console.log(token)

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

// @desc get  user 
// @rout GEt /api/user/query
// @access Private
const queryUser = asyncHandler( async (req, res) => {


    var userName = req.query.search; //userName = 'Juan David Nicholls';
    var searchString = new RegExp(userName, 'ig');

    const page = parseInt(req.query.page)
    const limit = 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const link = []

        
    User.aggregate()
    .project({
        id: '$_id',
        full_name: { $concat: ['$first_name', ' ', '$last_name'] },
        first_name: 1,
        last_name: 1,
        role: 1,
        last_login: 1,
        email: 1,
    })
    .match({ full_name: searchString })
    .skip(startIndex) 
    .limit(limit)
    .exec(function (err, users) {
        if (err) throw err;

        User.estimatedDocumentCount(searchString).exec((count_error, count) => {
            const lastPage = Math.ceil(count / limit)
            const fromValue = (limit * page) - (limit -1)
            const toValue = page === lastPage ? count : (limit * page)

            if (err) {
              return res.json(count_error);
            }

            if (startIndex > 0) {
                link.push({
                    url: `/?page=${page - 1}`,
                    label: "&laquo; Previous",
                    active: false,
                    page: page - 1
                })
            }

            var startPage, endPage;
            if (lastPage <= 10) {
            // less than 10 total pages so show all
                startPage = 1;
                endPage = lastPage;
            } else {
            // more than 10 total pages so calculate start and end pages
                if (page <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (page + 4 >= lastPage) {
                    startPage = lastPage - 9;
                    endPage = lastPage;
                } else {
                    startPage = page - 5;
                    endPage = page + 4;
                }
            }

            for (let index = startPage; index <= endPage; index++) {
                    link.push({
                        url: `/?page=${index}`,
                        label: `${index}`,
                        active: true,
                        page: index
                    }) 
            }
            

            if (endIndex < count) {
                link.push({
                    url: `/?page=${page + 1}`,
                    label: "Next &raquo;",
                    active: false,
                    page: page + 1
                })
            }  

            res.status(200).json({
                data: users,
                payload: {pagination: {
                    page: page,
                    items_per_page: limit,
                    first_page_url: '/?page=1',
                    from: fromValue,
                    last_page: lastPage,
                    links: link,
                    next_page_url: page + 1 > lastPage? null :`/?page=${page + 1}`,
                    items_per_page: limit,
                    prev_page_url: page - 1 === 0 ? null :` /?page=${page - 1}`,
                    to: toValue,
                    total: count
                }}
            })
        });
    });
})


// @desc get user data
// @rout GEt /api/user/me
// @access Private
const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
        data: user
    })
})


// @ desc Update something
// @rout PUT /api/dashboard/:id
const updateUser = asyncHandler (async (req, res) => {

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedUser)

})

// @ desc Delete something
// @rout DELETE /api/dashboard
const deleteUser = asyncHandler (async (req, res) => {

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedUser)

})

// @desc get user data
// @rout GEt /api/user/me
// @access Private
//probably profile
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
    queryUser,
    updateUser,
    getUserById,
    deleteUser
}
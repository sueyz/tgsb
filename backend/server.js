const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors');

connectDB()

const app = express()

const corsOptions ={
    origin:'http://localhost:3011', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/quotations', require('./routes/quotationRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/company', require('./routes/companyRoutes'))


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

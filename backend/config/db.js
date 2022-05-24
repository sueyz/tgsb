const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const mongodb = require('mongodb')

const connectDB = async() => {
    
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)



        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
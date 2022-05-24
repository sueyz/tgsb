const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const mongodb = require('mongodb')

const connectDB = async() => {
    
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL)

    //     let caCertificatePath=  ""
    // if (process.env.CA_CERT) {
    //     caCertificatePath = path.resolve("./ca-certificate.crt")
    //     fs.writeFileSync(caCertificatePath, process.env.CA_CERT);
    // }

    // const client = await new mongodb.MongoClient(conn, {
    //     sslCA: caCertificatePath,
    // });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const mongodb = require('mongodb')

const connectDB = async() => {
    
    try {
        
        let caCertificatePath=  ""
    if (process.env.CA_CERT) {
        caCertificatePath = path.resolve("./ca-certificate.crt")
        fs.writeFileSync(caCertificatePath, process.env.CA_CERT);
    }

    const client = await new mongodb.MongoClient(process.env.DATABASE_URL, {
        sslCA: caCertificatePath,
    });

        console.log(`MongoDB Connected: ${client}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
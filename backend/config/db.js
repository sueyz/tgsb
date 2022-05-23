const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const mongodb = require('mongodb')

const connectDB = async() => {

    let caCertificatePath = ""
    if (process.env.CA_CERT) {
        caCertificatePath = path.resolve("./ca-certificate.crt")
        fs.writeFileSync(caCertificatePath, process.env.CA_CERT);


    }
    console.log("caCertificatePath")


    
    try {
        // const conn = await mongoose.connect(process.env.DATABASE_URL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     ssl: true,
        //     sslValidate: true,
        //     sslCA: caCertificatePath,
        //    })

        const conn = new mongodb.MongoClient(process.env.DATABASE_URL, {
            sslCA: caCertificatePath,
        });
        

        console.log(`MongoDB Connected: ${conn}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
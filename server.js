const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors');
const asyncHandler = require('express-async-handler')
const Quotation = require('./model/quotationModel')
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a44b265099b3b5",
        pass: "6415db25f42dca"
    }
});

const mailOptions = {
    from: 'sueazmin@gmail.com',
    to: 'sueazmin@gmail.com',
    subject: 'Collect Balance',
    text: 'There are balance that needs collection in 3 days. Please check the dashboard to see more info'
};


connectDB()

const app = express()


const corsOptions = {
    origin: 'http://192.168.1.6:3000/auth',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

const getAllUnlockQuotation = asyncHandler(async (req, res) => {

    await Quotation.find({ lock: false }).then((response) => {
        for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].payment_term.length; j++) {
                const threeDaysAgo = new Date(new Date(`${response[i].payment_term[j].date}T00:00:00.000Z`) - 3 * 24 * 60 * 60 * 1000)

                schedule.scheduleJob(threeDaysAgo, function () {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                });
            }
        }
    })


})



app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/quotations', require('./routes/quotationRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/company', require('./routes/companyRoutes'))
app.use('/api/expenses', require('./routes/expensesRoutes'))


//mail reminder schedule
getAllUnlockQuotation()


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

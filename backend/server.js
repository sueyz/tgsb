const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.use('/api/dashboard', require('./routes/dashboardRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))

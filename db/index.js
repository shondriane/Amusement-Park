require ('dotenv').config()
const mongoose = require('mongoose')


let  MONGODB_URI = process.env.MONGODB_URI;
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
mongoose.set('debug', true)

module.exports = db
const mongoose = require('mongoose')
require('dotenv').config

const connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("db connected successfullly"))
  .catch((err) => {
    console.log('db connection issues')
    console.error(err)
    process.exit(1)
  })
}

module.exports = connectDB
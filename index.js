const express = require("express")
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 4000

app.use(express.json()) 

const cookieParser = require("cookie-parser")
app.use(cookieParser())

const connectWithDB = require("./config/database");
connectWithDB();

//route import and mount
const user = require("./routes/user")
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`)
})

app.get("/", (req, res)=>{
  res.send(`<h1>This is home page</h1>`)
})
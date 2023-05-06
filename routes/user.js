const express = require("express")
const router = express.Router() 

const {login, signup} = require('../controllers/Auth')
const {auth, isStudent, isAdmin} = require('../middewares/auth')

router.post("/login", login)
router.post("/signup", signup)

router.get("/test", auth , (req, res) => {
  res.json({
    success: true,
    message:"Welcome to protected route Tests"
  })
})
//protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message:"Welcome to protected route Student"
  })
})

router.get("/admin", auth , isAdmin, (req, res) => {
  res.json({
    success: true,
    message:"Welcome to protected route Admin"
  })
})

module.exports = router;
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

router.get("/getEmail", auth, async (req, res) => {
  try{
    const id = req.user.id
    const user = await User.findOne({id})

    res.status(200).json({
      success: true,
      user: user,
      message:"welcome to email route"
    })
  } catch(error){
    res.status(500).json({
      success: false,
      error: error.message,
      message: "code failed"
    })
  }
})

module.exports = router;
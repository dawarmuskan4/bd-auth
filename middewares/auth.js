//auth , isStudent, isAdmin middleware

const jwt = require("jsonwebtoken")
require("dotenv").config()

//authentication middleware
exports.auth = (req, res, next) => {
  try{
    //extract JWT token
    //Pending : other ways to fetch token
    const token = req.cookie.token || req.body.token || req.header("Authorization").replace("Bearer ", " ");
    
    if(!token){
      return res.status(401).json({
        success: false,
        message: "Token Missing"
      })
    }

    //verify the token
    try{
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decode)

      req.user = decode
    } catch(error){
      return res.status(401).json({
        success: false,
        message: "Token invalid"
      })
    }

    next()
  } catch(error){
    return res.status(401).json({
      success: false,
      message:"Something went wrong while verifying the token"
    })
  }
}

//authorization middleware
exports.isStudent = (req, res, next) => {
  try{
    if(req.user.role != "Student"){
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students"
      })
    }
    next()
  } catch(error){
    return res.status(401).json({
      success: false,
      message:"User role can't be verified"
    })
  }
}

exports.isAdmin = (req, res, next) => {
  try{
    if(req.user.role != "Admin"){
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin"
      })
    }
    next()
  } catch(error){
    return res.status(401).json({
      success: false,
      message:"User role can't be verified"
    })
  } 
}
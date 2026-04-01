const express = require("express")
const router = express.Router()

router.post("/signup",(req,res)=>{
  res.send("Signup working")
})

router.post("/login",(req,res)=>{
  res.send("Login working")
})

module.exports = router
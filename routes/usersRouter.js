const express = require("express");
const router =  express.Router();
const {registerUser,loginUser,logoutUser} = require("../controllers/authController");



router.get("/",(req,res)=>{
    res.send("Hey");
});
router.post('/login',loginUser);
router.post("/register",registerUser);
router.get("/logout",logoutUser);

module.exports  = router;  
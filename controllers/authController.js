const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async (req,res)=>{
    
    try{
        let {email,password,fullname} = req.body;
        let user = await userModel.findOne({email:email});
        if(user)
        {
            req.flash("error","User already exists please login..!")
            return res.redirect("/");
        } 
        else
        {
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(password,salt,async (err,hash)=>{
                    if(err) return err.message;
                    let createdUser = await userModel.create({
                        email:email,
                        password:hash,
                        fullname:fullname,
                    })
                  
                    let token = generateToken(createdUser);
                    res.cookie("token", token)
                    res.redirect("/shop");
                    // res.status(201).send(createdUser);
                });
            });
           
        }
        
    }
    catch(error){
        res.send(error.message);
    }

}


module.exports.loginUser = async (req,res)=>{
    
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email:email});
        if(!user){
            req.flash("error","Incorrect email details...!");
            return res.redirect("/");
        } 
        bcrypt.compare(password,user.password,(err,result)=>{

            if(!result){
                req.flash("error","Incorrect password user details...!");
                return res.redirect("/");
            }       
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        });
       
    }
    catch(error){
        res.send(error.message);
    }

}

module.exports.logoutUser = (req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}
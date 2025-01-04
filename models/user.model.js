const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullname :{
        type:String,
        minlength:3,
        trim:true,
    },
    email:String,
    password:String,
    products:[],
    contact:Number,
    picture:String,
    gstin:String,   
})

module.exports = mongoose.model("owner",ownerSchema);
const mongoose = require('mongoose');
const config = require("config")
const debgr = require("debug")("development:mongoose");
mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(()=>{
    debgr("Connected");
})
.catch((err)=>{
    debgr("Failed to connect the database... ")
})

module.exports = mongoose.connection;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {    
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String
    },
    job_title: {
        type: String
    }
}, {timestamps: true});


const User = mongoose.model("User", userSchema); // name of the model, schema -> User here is collection name

module.exports = User; // to export the user model
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username should be unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email should be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
});

// userSchema.pre('save', async function(next){
//     if(!validator.isEmail(this.email)){
//         return next(new Error("Invalid email address format!"))
//     }
//     return next();
// });

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
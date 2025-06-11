const mongoose = require("mongoose");
const PasswordUtil = require("../utils/bcryt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{ timestamps: true }
);


// Hash the password before saving the user
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await PasswordUtil.hashPassword(this.password);
    next();
});

module.exports = mongoose.model("User", userSchema);
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is required!"],
    },
    email: {
        unique: true,
        required: [true, 'Email is required!'],
        type: String
    },
    password: {
        type: String,
        select: false,
    }
}, { timestamps: true })

// Hashing password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

//JWT_TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, 'somethingFishy', {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword: string) {

    return await bcrypt.compare(enteredPassword, this.password)

}

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [30, "Your name cannot exceed 30 characters"]
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"]
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false
    },
    avatar: {
      publicId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    role: {
      type: String,
      default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true
  }
);

// Encrypt password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    next();
  }
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRES_TIME || "1s"
  });
};

const User = mongoose.model("User", userSchema);

export default User;

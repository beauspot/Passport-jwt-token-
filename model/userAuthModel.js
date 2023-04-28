import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const Authenticationschema = mongoose.Schema({
  fullname: {
    type: String,
    requried: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    requried: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 20,
  },
});

Authenticationschema.pre("save", async function (next) {
  const saltrounds = await bcrypt.genSalt(10);
  const hashPwd = bcrypt.hash(this.password, saltrounds);
  // initializing the plain-text password with the hash.
  this.password = hashPwd;
  next();
});

Authenticationschema.methods.comparePassword = async function (password) {
  const comparepwd = await bcrypt.compare(password, this.password);
  return comparepwd;
};

const authenticationModel = mongoose.model(
  "authenticationModel",
  Authenticationschema
);

export default authenticationModel;

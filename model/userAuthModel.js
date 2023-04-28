import mongoose from "mongoose";

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

const authenticationModel = mongoose.model(
  "authenticationModel",
  Authenticationschema
);

export default authenticationModel;

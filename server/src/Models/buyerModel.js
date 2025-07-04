// defines the structure of a buyer's data (like name, email, password).

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

buyerSchema.pre("save", async function (next) {
  //dui choti modify nahos
  if (!this.isModified("password")) {
    return next();
  }
  //hashing with salt
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match w user pw
buyerSchema.methods.comparePW = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Buyer = mongoose.model("Buyer", buyerSchema);

export default Buyer;

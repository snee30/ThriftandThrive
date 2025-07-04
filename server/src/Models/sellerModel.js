import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

sellerSchema.pre("save", async function (next) {
  //dui choti modify nahos
  if (!this.isModified("password")) {
    return next();
  }
  //hashing with salt
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match w user pw
sellerSchema.methods.comparePW = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;

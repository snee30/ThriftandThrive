import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  //dui choti modify nahos
  if (!this.isModified("password")) {
    return next();
  }
  //hashing with salt
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match w user pw
adminSchema.methods.comparePW = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;

import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  username: string;
  password: string;
  height: number;
  weight: number;
  isAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema({
  username: String,
  password: String,
  height: Number,
  weight: Number,
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error: any) {
      return next(error);
    }
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;

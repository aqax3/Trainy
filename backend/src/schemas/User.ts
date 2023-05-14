import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: String,
    email: String,
    password: String,
});

userSchema.pre<IUser>('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;
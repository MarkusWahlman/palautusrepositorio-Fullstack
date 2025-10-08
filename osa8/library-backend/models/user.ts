import mongoose, { Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser extends Document {
  username: string;
  favoriteGenre: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;

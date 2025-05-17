import mongoose, { Schema, Document } from "mongoose";
import { IBlog } from "./blog";

interface IUser extends Document {
  username: string;
  name: string;
  passwordHash: string;
  blogs: IBlog[];
}

const userSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;

    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export { IUser, User };

import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

interface IBlog extends Document {
  title: string;
  author: string;
  url: string;
  likes: number;
  user: IUser;
}

const blogSchema: Schema = new Schema<IBlog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export { IBlog, Blog };

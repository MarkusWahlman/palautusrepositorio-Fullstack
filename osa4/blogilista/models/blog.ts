import mongoose, { Schema, Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  author: string;
  url: string;
  likes: number;
}

const blogSchema: Schema = new Schema<IBlog>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export { IBlog, Blog };

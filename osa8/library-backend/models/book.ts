import mongoose, { Model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IAuthor } from "./author";

export interface IBook extends Document {
  title: string;
  published: number;
  author: IAuthor | mongoose.Types.ObjectId;
  genres: string[];
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

bookSchema.plugin(uniqueValidator);

const Book: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);
export default Book;

import mongoose, { Model, Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IAuthor extends Document {
  name: string;
  born?: number;
}

const authorSchema: Schema<IAuthor> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

authorSchema.plugin(uniqueValidator);

const Author: Model<IAuthor> = mongoose.model<IAuthor>("Author", authorSchema);
export default Author;

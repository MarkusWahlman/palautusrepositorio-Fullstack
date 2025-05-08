import express, { Request, Response } from "express";
import cors from "cors";
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

const mongoUrl = "mongodb://localhost/bloglist";
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/blogs", async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.post("/api/blogs", async (req: Request, res: Response) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: "Failed to save blog" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

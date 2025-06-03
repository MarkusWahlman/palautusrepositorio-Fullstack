import "dotenv/config";

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bloglist";

const secret = process.env.SECRET;
if (!secret) {
  throw new Error("SECRET environment variable is not set. Exiting.");
}
const SECRET: string = secret;

export { PORT, MONGODB_URI, SECRET };

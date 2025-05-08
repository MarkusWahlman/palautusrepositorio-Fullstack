import 'dotenv/config'

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bloglist"

export { PORT, MONGODB_URI }
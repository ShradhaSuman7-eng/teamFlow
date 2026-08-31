import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

await connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`TeamFlow server is running on port ${PORT}`);
});

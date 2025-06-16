import express from "express";
import mongoose from "mongoose"; 
import jwt from "jsonwebtoken";
import contentRoutes from "./routes/content"
import cors from "cors"
const port = 3000
const app = express();
app.use(cors())
app.use(express.json());
app.use("/api/brain",contentRoutes);


const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/second-brain",
      {
        family: 4, // Force IPv4
      }
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(port, () => {
    console.log("🚀 Server listening on", port);
  });
});

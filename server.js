// 1. Load environment variables
import dotenv from "dotenv";

dotenv.config();

// 2. Import dependencies
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import noteRoutes from "./routes/noteRoutes.js";

// 3. App setup
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware
app.use(cors());
app.use(express.json());

// 6. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 7. Routes
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use("/notes", noteRoutes);

// 8. Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

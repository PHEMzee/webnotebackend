// 1. Import dependencies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Note from "./models/Note.js";

// 2. Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// 3. Middleware
app.use(cors()); // Allows React (port 3000) to communicate with Express
app.use(express.json()); // Parses incoming JSON data

// 4. Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 5. Routes
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.get("/notes", async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    console.error(
      "MongoDB is not connected. readyState:",
      mongoose.connection.readyState,
    );
    return res
      .status(503)
      .json({ message: "Backend is not connected to the database." });
  }

  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to load notes." });
  }
});

app.post("/notes", async (req, res) => {
  try {
    const { title = "", keyPoints = [], content = "", summary = "" } = req.body;

    const normalizedKeyPoints = Array.isArray(keyPoints)
      ? keyPoints.filter((item) => item && item.toString().trim() !== "")
      : typeof keyPoints === "string"
        ? keyPoints
            .split(",")
            .map((p) => p.trim())
            .filter((p) => p)
        : [];

    if (!title && !normalizedKeyPoints.length && !content && !summary) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided." });
    }

    const note = new Note({
      title,
      keyPoints: normalizedKeyPoints,
      content,
      summary,
    });
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Failed saving note:", error);
    res.status(500).json({ message: "Failed to create note." });
  }
});

app.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title = "", keyPoints = [], content = "", summary = "" } = req.body;

    const normalizedKeyPoints = Array.isArray(keyPoints)
      ? keyPoints.filter((item) => item && item.toString().trim() !== "")
      : typeof keyPoints === "string"
        ? keyPoints
            .split(",")
            .map((p) => p.trim())
            .filter((p) => p)
        : [];

    const updated = await Note.findByIdAndUpdate(
      id,
      { title, keyPoints: normalizedKeyPoints, content, summary },
      { new: true, runValidators: true },
    );

    if (!updated) return res.status(404).json({ message: "Note not found." });
    res.json(updated);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note." });
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Note not found." });
    res.json({ message: "Note deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete note." });
  }
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

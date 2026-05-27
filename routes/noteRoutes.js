import express from "express";
import mongoose from "mongoose";

import Note from "../models/Note.js";
import { createNotePayload } from "../utils/noteUtils.js";

const router = express.Router();

const DB_NOT_READY_MESSAGE = "Backend is not connected to the database.";

const ensureDatabase = (res) => {
  if (mongoose.connection.readyState !== 1) {
    console.error(
      "MongoDB is not connected. readyState:",
      mongoose.connection.readyState,
    );
    res.status(503).json({ message: DB_NOT_READY_MESSAGE });
    return false;
  }

  return true;
};

router.get("/", async (req, res) => {
  if (!ensureDatabase(res)) return;

  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to load notes." });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = createNotePayload(req.body);

    if (
      !payload.title &&
      !payload.keyPoints.length &&
      !payload.content &&
      !payload.summary
    ) {
      return res
        .status(400)
        .json({ message: "At least one field must be provided." });
    }

    const savedNote = await new Note(payload).save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Failed saving note:", error);
    res.status(500).json({ message: "Failed to create note." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = createNotePayload(req.body);

    const updated = await Note.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json({ message: "Note deleted." });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Failed to delete note." });
  }
});

export default router;

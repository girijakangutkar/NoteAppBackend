const express = require("express");
const NoteModel = require("../model/NoteModel");
const NotesRouter = express.Router();
const authMiddleware = require("../middleware/auth");

NotesRouter.get(
  "/notes",
  authMiddleware(["user", "admin", "moderator"]),
  async (req, res) => {
    try {
      const query = {};
      if (req.role == "user") {
        query.createdBy = req.userId;
      }
      const notes = await NoteModel.find(query);
      res.status(200).json({ msg: "Success", notes });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

NotesRouter.post(
  "/notes",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const newNote = {
        ...req.body,
        createdBy: req.userId,
        creation: Date.now(),
      };
      const addData = await NoteModel.create(newNote);
      res.status(201).json({ msg: "Note added", addData });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

NotesRouter.put(
  "/notes/:id",
  authMiddleware(["user", "admin", "moderator"]),
  async (req, res) => {
    try {
      const userId = req.userId;

      // Remove the creation field from req.body to prevent it from being updated
      const { creation, ...updateData } = req.body;

      // Find the note first to check ownership
      const existingNote = await NoteModel.findById(req.params.id);

      if (!existingNote) {
        return res.status(404).json({ msg: "Note not found" });
      }

      // Check if user owns the note (unless admin/moderator)
      if (req.role === "user" && existingNote.createdBy.toString() !== userId) {
        return res.status(403).json({ msg: "Access denied" });
      }

      // Update the note
      const updatedNote = await NoteModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.status(200).json({ msg: "Note updated", userNotes: updatedNote });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

NotesRouter.delete(
  "/notes/:id",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const findNote = await NoteModel.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.userId,
      });

      if (!findNote) return res.status(404).json({ msg: "Note not found" });

      res.status(200).json({ msg: "Deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = NotesRouter;

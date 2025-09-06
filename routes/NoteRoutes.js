const express = require("express");
const NoteModel = require("../model/NoteModel");
const NotesRouter = express.Router();
const authMiddleware = require("../middleware/auth");

//* Get published notes by all users
NotesRouter.get(
  "/publishedNotes",
  // authMiddleware(["user", "admin", "moderator"]),
  async (req, res) => {
    try {
      const findPublishedNotes = await NoteModel.find({
        publishStatus: true,
      }).populate("createdBy", "name");

      if (findPublishedNotes.length > 0) {
        res.status(200).json({
          msg: "Published notes fetched successfully",
          findPublishedNotes: findPublishedNotes,
        });
      } else {
        res.status(404).json({ msg: "Cannot find any published notes" });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong while getting the published notes",
      });
    }
  }
);

//* Read specific note
NotesRouter.get(
  "/readNote/:id",
  // authMiddleware(["user", "admin", "moderator"]),
  async (req, res) => {
    try {
      const noteId = req.params.id;
      const readNote = await NoteModel.findById(noteId).populate(
        "createdBy",
        "name"
      );

      if (!readNote) {
        return res.status(404).json({ msg: "Note not found" });
      }
      res.status(200).json({ msg: "Note found", readNote: readNote });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Something went wrong while opening the book" });
    }
  }
);

//* Get notes own by you
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
      console.error(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

//* Add your notes
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
      console.error(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

//* Edit your notes
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
      console.error(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

//* Publish the note status
NotesRouter.patch(
  "/publishThis/:id",
  authMiddleware(["user", "admin"]),
  async (req, res) => {
    try {
      const noteId = req.params.id;
      const userId = req.userId;

      const existingNote = await NoteModel.findById(noteId);

      if (!existingNote) {
        return res.status(404).json({ msg: "Note not found" });
      }

      if (req.role === "user" && existingNote.createdBy.toString() !== userId) {
        return res.status(403).json({ msg: "Access denied" });
      }

      const updatedNote = await NoteModel.findByIdAndUpdate(
        noteId,
        { publishStatus: req.body.publishStatus },
        { new: true }
      );

      res.status(200).json({
        msg: "Status update success",
        updatedNote: updatedNote,
      });
    } catch (error) {
      console.error("Publish error:", error);
      res.status(500).json({
        msg: "Something went wrong while publishing the note",
        error: error.message,
      });
    }
  }
);

//* Delete your notes
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
      console.error(error.message);
      res.status(500).json({ msg: "Something went wrong" });
    }
  }
);

module.exports = NotesRouter;

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  // coverPage:{type:String},
  publishStatus: { type: Boolean, default: false },
  creation: { type: Date, default: new Date() },
});

const NoteModel = mongoose.model("notes", NoteSchema);

module.exports = NoteModel;

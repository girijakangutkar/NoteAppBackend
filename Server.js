const express = require("express");
const UserRouter = require("./routes/UserRoutes");
const NotesRouter = require("./routes/NoteRoutes");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Everything is working fine");
});

const cors = require("cors");
app.use(
  cors({
    origin: "https://notehere.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", UserRouter);

app.use("/app", NotesRouter);

app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});

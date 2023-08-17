import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import { userRouter } from "./user/routes.js";
import { postRouter } from "./user/PostRoutes.js";
import { commentRouter } from "./user/CommentRoutes.js";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT || 3001;
const app = express();

// const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
// const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

const ReactAppDistPath = path.join(path.resolve(), "..", "frontend", "dist");
const ReactAppIndex = path.join(
  path.resolve(),
  "..",
  "frontend",
  "dist",
  "index.html"
);

console.log(ReactAppDistPath);
console.log(ReactAppIndex);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDistPath));
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

/*
 * express.static matched auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex);
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});

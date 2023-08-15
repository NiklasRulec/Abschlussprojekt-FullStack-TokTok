import "../config/config.js";
import express from "express";
import { Comment } from "./CommentModel.js";

export const commentRouter = express.Router();

// Kommentar hinzufügen
commentRouter.post("/", async (req, res) => {
  try {
    const dbRes = await Comment.create(req.body);
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// Kommentar bearbeiten
commentRouter.put("/:id", async (req, res) => {
  try {
    const dbRes = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

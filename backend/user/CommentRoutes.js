import "../config/config.js";
import express from "express";
import { Comment } from "./CommentModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import User from "./UserModel.js";

export const commentRouter = express.Router();

// get by id
commentRouter.get("/:id", async (req, res) => {
  try {
    const dbRes = await Comment.findById(req.params.id);
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

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
// commentRouter.put("/:id", async (req, res) => {
//   try {
//     const dbRes = await Comment.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(dbRes);
//   } catch (err) {
//     console.log(err);
//     res.send("there was an error");
//   }
// });

// update comment by id -> add likes ----------------------------------------------------------------------------------------------

commentRouter.put("/likes/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    const userId = user._id;
    const comment = await Comment.findById(req.params.id);
    comment.likes.push(userId);
    await comment.save();
    res.send("like was added");
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// update comment by id -> delete likes ----------------------------------------------------------------------------------------------

commentRouter.delete("/likes/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    const userId = user._id;
    const comment = await Comment.findById(req.params.id);
    const index = comment.likes.indexOf(userId);
    if (index >= 0) {
      comment.likes.splice(index, 1);
      await comment.save();
      res.send("like was deleted");
    } else {
      res.send("item not found");
    }
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

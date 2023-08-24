import "../config/config.js";
import express from "express";
import multer from "multer";
import { Post } from "./PostModel.js";
import { Comment } from "./CommentModel.js";
import { v2 as cloudinary } from "cloudinary";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import User from "./UserModel.js";

export const postRouter = express.Router();
const img_upload = multer({ storage: multer.memoryStorage() });

// get all posts --------------------------------------------------------------------------------------------------------------

postRouter.get("/", async (req, res) => {
  try {
    const dbRes = await Post.find();
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// get post by id -------------------------------------------------------------------------------------------------------------

postRouter.get("/:id", async (req, res) => {
  try {
    const dbRes = await Post.findById(req.params.id)
      .populate("comments")
      .populate("user");
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// create new post -------------------------------------------------------------------------------------------------------------

postRouter.post(
  "/",
  img_upload.single("image"),
  authenticateToken,
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.userEmail });
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "TokTok" },
          async (err, result) => {
            const dbRes = await Post.create({
              user: user._id,
              caption: req.body.caption,
              amountOfComments: 0,
              amountOfLikes: 0,
              time: "1 minute ago",
              image: { url: result.secure_url, imageId: result.public_id },
            });
            user.posts.splice(0, 0, dbRes);
            user.amountOfPosts = user.posts.length;
            await user.save();
            res.json(dbRes);
          }
        )
        .end(req.file.buffer);
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// update post by id -> add comments ----------------------------------------------------------------------------------------------

// man darf nicht das bild oder den inhalt von einem Post updaten -> diese route ist NUR dafür da, um Kommentare zu einem Post hinzuzufügen !
// jeder User darf Kommentare bei Posts von anderen Usern hinzufügen
// dafür muss zuerst ein Kommentar nach dem Comment Schema erstellt werden
// dann den Kommentar in den Post einfügen mit der objectId
postRouter.put("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    const post = await Post.findById(req.params.id);
    post.comments.push(comment);
    await Promise.all([comment.save(), post.save()]);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// update post by id -> add likes ----------------------------------------------------------------------------------------------

postRouter.put("/likes/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    const userId = user._id;
    const post = await Post.findById(req.params.id);
    post.likes.push(userId);
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// update post by id -> delete likes ----------------------------------------------------------------------------------------------

postRouter.delete("/likes/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail });
    const userId = user._id;
    const post = await Post.findById(req.params.id);
    const index = post.likes.indexOf(userId);
    if (index >= 0) {
      post.likes.splice(index, 1);
      await post.save();
      res.send("like was deleted");
    } else {
      res.send("item not found");
    }
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

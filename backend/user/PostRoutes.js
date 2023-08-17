import "../config/config.js";
import express from "express";
import multer from "multer";
import { Post } from "./PostModel.js";
import { Comment } from "./CommentModel.js";
import { v2 as cloudinary } from "cloudinary";

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

postRouter.post("/", img_upload.single("image"), async (req, res) => {
  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "TokTok" },
        async (err, result) => {
          const dbRes = await Post.create({
            ...req.body,
            image: { url: result.secure_url, imageId: result.public_id },
          });
          res.json(dbRes);
        }
      )
      .end(req.file.buffer);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// update post by id -> add comments ----------------------------------------------------------------------------------------------

// man darf nicht das bild oder den inhalt von einem Post updaten -> diese route ist NUR dafür da, um Kommentare zu einem Post hinzuzufügen !
// jeder User darf Kommentare bei Posts von anderen Usern hinzufügen
// dafür muss zuerst ein Kommentar nach dem Comment Schema erstellt werden
// dann den Kommentar in den Post einfügen mit der objectId
postRouter.put("/:id", async (req, res) => {
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

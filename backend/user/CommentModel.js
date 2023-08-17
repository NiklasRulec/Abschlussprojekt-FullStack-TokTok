import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    // type: Date,
    // required: true,
  },
  amountOfLikes: {
    type: Number,
  },
});

export const Comment = mongoose.model("Comment", commentSchema);

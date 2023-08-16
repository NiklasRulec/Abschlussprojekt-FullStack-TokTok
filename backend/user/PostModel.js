import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: {
      url: String,
      imageId: String,
    },
    required: true,
  },
  location: {
    type: String,
  },
  facebook: {
    type: Boolean,
  },
  twitter: {
    type: Boolean,
  },
  tumblr: {
    type: Boolean,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  time: {
    type: String,
    // type: Date,
    // required: true,
  },
  amountOfLikes: {
    type: Number,
  },
  amountOfComments: {
    type: Number,
  },
});

export const Post = mongoose.model("Post", postSchema);

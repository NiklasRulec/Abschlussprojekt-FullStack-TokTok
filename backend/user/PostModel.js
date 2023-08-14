import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    type: {
      url: String,
      imageId: String,
    },
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
});

export const Post = mongoose.model("Post", postSchema);

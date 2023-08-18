import crypto from "crypto";
import mongoose from "mongoose";

const isEmail = (string) => {
  const [name, domainWithTLD, ...rest] = string.split("@");
  if (rest.length || !name || !domainWithTLD) {
    return false;
  }
  const [domain, tld] = domainWithTLD.split(".");
  if (tld.length < 2 || !domain) return false;
  return true;
};

export const userSchema = new mongoose.Schema({
  name: { type: String },
  nickname: { type: String },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  salt: { type: String, required: true, select: false },
  hash: { type: String, required: true, select: false },
  profession: {
    type: String,
  },
  description: {
    type: String,
  },
  domain: {
    type: String,
  },
  amountOfPosts: {
    type: Number,
  },
  amountOfFollowers: {
    type: Number,
  },
  amountOfFollowing: {
    type: Number,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  image: {
    type: {
      url: String,
      imageId: String,
    },
  },
  gallery: [
    {
      type: {
        url: String,
        imageId: String,
      },
    },
  ],
  isLiking: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
  ],
  isFollowing: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

export const User = mongoose.model("User", userSchema);

export default User;

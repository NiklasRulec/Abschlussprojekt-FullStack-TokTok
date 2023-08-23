import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";
import { v2 as cloudinary } from "cloudinary";

export const userRouter = Router();
const img_upload = multer({ storage: multer.memoryStorage() });

const multerMiddleware = multer();

// create fake gallery

// userRouter.put("/gallery/:id", img_upload.single("image"), async (req, res) => {
//   try {
//     cloudinary.uploader
//       .upload_stream(
//         {
//           resource_type: "image",
//           folder: "TokTok_Gallery",
//         },
//         async (err, result) => {
//           if (err) {
//             return res
//               .status(500)
//               .send({ message: "image upload failed", err });
//           }
//           const user = await User.findById(req.params.id);
//           console.log(user);
//           user.gallery.push({
//             url: result.secure_url,
//             imageId: result.public_id,
//           });
//           await user.save();
//           res.send(user);
//         }
//       )
//       .end(req.file.buffer);
//   } catch (err) {
//     console.log(err);
//     res.send("there was an error");
//   }
// });

// get all users -------------------------------------------------------------------------------------------

userRouter.get("/", async (req, res) => {
  const users = await User.find().populate("posts");
  res.send(users);
});

// fake gallery

const gallery = [
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604354/TokTok_Gallery/h3vwomv85w1wy90jljbz.jpg",
    imageId: "TokTok_Gallery/h3vwomv85w1wy90jljbz",
    _id: "64e317c31a219d5165693316",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604377/TokTok_Gallery/aqxuv4zlapxxc4hbxnei.jpg",
    imageId: "TokTok_Gallery/aqxuv4zlapxxc4hbxnei",
    _id: "64e317d91a219d516569331c",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604444/TokTok_Gallery/kij7pepbgoakoh4qe7vj.jpg",
    imageId: "TokTok_Gallery/kij7pepbgoakoh4qe7vj",
    _id: "64e3181c1a219d5165693321",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604472/TokTok_Gallery/fguedcaoz3bk55mle5u5.jpg",
    imageId: "TokTok_Gallery/fguedcaoz3bk55mle5u5",
    _id: "64e318391a219d516569332d",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604486/TokTok_Gallery/nnok7km7exn8td86dqfp.jpg",
    imageId: "TokTok_Gallery/nnok7km7exn8td86dqfp",
    _id: "64e318471a219d5165693334",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604499/TokTok_Gallery/l9wbfif8kszuaa9dx87f.jpg",
    imageId: "TokTok_Gallery/l9wbfif8kszuaa9dx87f",
    _id: "64e318541a219d516569333c",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604509/TokTok_Gallery/xgphhs9ojdgxnhbzpivs.jpg",
    imageId: "TokTok_Gallery/xgphhs9ojdgxnhbzpivs",
    _id: "64e3185e1a219d5165693345",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604521/TokTok_Gallery/wneav7syndox5oualyca.jpg",
    imageId: "TokTok_Gallery/wneav7syndox5oualyca",
    _id: "64e318691a219d516569334f",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604533/TokTok_Gallery/vyuambinwqxaacepzn0t.jpg",
    imageId: "TokTok_Gallery/vyuambinwqxaacepzn0t",
    _id: "64e318751a219d516569335a",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604544/TokTok_Gallery/vyjdnbbhbe2fpoey53zh.jpg",
    imageId: "TokTok_Gallery/vyjdnbbhbe2fpoey53zh",
    _id: "64e318801a219d5165693366",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604553/TokTok_Gallery/pl034yscsrmb6t0dprqk.jpg",
    imageId: "TokTok_Gallery/pl034yscsrmb6t0dprqk",
    _id: "64e318891a219d5165693373",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604562/TokTok_Gallery/ndd9ftns22zozoxgwmgg.jpg",
    imageId: "TokTok_Gallery/ndd9ftns22zozoxgwmgg",
    _id: "64e318921a219d5165693381",
  },
  {
    url: "https://res.cloudinary.com/dryqtwdls/image/upload/v1692604573/TokTok_Gallery/kylprrpjakptyjqq9scp.jpg",
    imageId: "TokTok_Gallery/kylprrpjakptyjqq9scp",
    _id: "64e3189e1a219d5165693390",
  },
];

// signup --------------------------------------------------------------------------------------------------

userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
  const { email } = req.body;
  const amountOfFollowers = 0;
  const amountOfFollowing = 0;
  const newUser = new User({
    email,
    gallery,
    amountOfFollowers,
    amountOfFollowing,
  });
  newUser.setPassword(req.body.password);
  try {
    await newUser.save();
    return res.send({
      data: {
        message: "New user created",
        user: { email },
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      return res.status(400).send({ error: e });
    }
    // Duplication Error email existiert bereits als user
    if (e.name === "MongoServerError" && e.code === 11000) {
      console.log("Account exists already");
      return res.status(400).send({
        error: { message: "Username and Password combination not valid" },
      });
    }
    return res.status(500).send({ error: { message: "Unknown Server error" } });
  }
});

// login ---------------------------------------------------------------------------------------------

const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+hash").select("+salt");
  const passwordIsValid = user.verifyPassword(password);
  if (passwordIsValid) {
    const token = generateAccessToken({ email });
    res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });
    res.send({ message: "success", data: user });
  } else {
    res.status(404).send({
      message: "failed to login",
      error: {
        message: "Password and E-Mail combination is wrong",
      },
    });
  }
});

// secure ------------------------------------------------------------------------------------------------------

userRouter.get("/secure", authenticateToken, async (req, res) => {
  // console.log(req.userEmail);
  res.send({ email: req.userEmail });
});

// get user profile of logged in user --------------------------------------------------------------------------

userRouter.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userEmail }).populate("posts");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// get user profile by id --------------------------------------------------------------------------------------

userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.find({ _id: userId }).populate("posts");
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// upload & edit profile pic of logged in user ------------------------------------------------------------------

userRouter.put(
  "/profile/img",
  authenticateToken,
  img_upload.single("image"),
  async (req, res) => {
    const user = await User.findOne({ email: req.userEmail });

    // wenn kein image vorhanden ist, erstmalig eins erstellen:
    if (user.image === undefined) {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "TokTok_Users",
          },
          async (err, result) => {
            if (err) {
              res.status(500).send({ message: "image upload failed", err });
            }
            const dbRes = await User.findOneAndUpdate(
              { email: req.userEmail },
              {
                ...req.body,
                image: { url: result.secure_url, imageId: result.public_id },
              },
              { new: true }
            );
            res.json(dbRes);
          }
        )
        .end(req.file.buffer);
    }
    // wenn bereits ein image vorhanden ist, dieses überschreiben:
    else {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            public_id: user.image.imageId,
            overwrite: true,
          },
          async (err, result) => {
            if (err) {
              res.status(500).send({ message: "image upload failed", err });
            }
            const dbRes = await User.findOneAndUpdate(
              { email: req.userEmail },
              {
                ...req.body,
                image: { url: result.secure_url, imageId: result.public_id },
              },
              { new: true }
            );
            res.json(dbRes);
          }
        )
        .end(req.file.buffer);
    }
  }
);

// update profile infos of logged in user -------------------------------------------------------------------

userRouter.put("/profile", authenticateToken, async (req, res) => {
  try {
    const dbRes = await User.findOneAndUpdate(
      { email: req.userEmail },
      req.body,
      { new: true }
    );
    res.json(dbRes);
  } catch (err) {
    console.log(err);
    res.send("there was an error");
  }
});

// add POST likes to account of logged in user ------------------------------------------------------------------------

userRouter.put(
  "/profile/posts/:postId",
  authenticateToken,
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const user = await User.findOne({ email: req.userEmail });
      user.isLikingPosts.push(postId);
      await user.save();
      res.send("post was added to 'isLikingPosts'");
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// delete POST likes from account of logged in user -------------------------------------------------------------------

userRouter.delete(
  "/profile/posts/:postId",
  authenticateToken,
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const user = await User.findOne({ email: req.userEmail });
      let index = user.isLikingPosts.indexOf(postId);
      if (index >= 0) {
        user.isLikingPosts.splice(index, 1);
        await user.save();
        res.send("post was deleted from 'isLikingPosts'");
      } else {
        res.send("item not found");
      }
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// add COMMENTS likes to account of logged in user ------------------------------------------------------------------------

userRouter.put(
  "/profile/comments/:commentId",
  authenticateToken,
  async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const user = await User.findOne({ email: req.userEmail });
      user.isLikingComments.push(commentId);
      await user.save();
      res.send("comment was added to 'isLikingComments'");
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// delete COMMENT likes from account of logged in user -------------------------------------------------------------------

userRouter.delete(
  "/profile/comments/:commentId",
  authenticateToken,
  async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const user = await User.findOne({ email: req.userEmail });
      let index = user.isLikingComments.indexOf(commentId);
      if (index >= 0) {
        user.isLikingComments.splice(index, 1);
        await user.save();
        res.send("comment was deleted from 'isLikingComments'");
      } else {
        res.send("item not found");
      }
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// add following to account of logged in user --------------------------------------------------------------------

userRouter.put(
  "/profile/following/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ email: req.userEmail });
      user.isFollowing.push(userId);
      await user.save();
      res.send("user was added to 'isFollowing'");
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// delete following from account of logged in user ---------------------------------------------------------------

userRouter.delete(
  "/profile/following/:userId",
  authenticateToken,
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ email: req.userEmail });
      let index = user.isFollowing.indexOf(userId);
      if (index >= 0) {
        user.isFollowing.splice(index, 1);
        await user.save();
        res.send("user was deleted from 'isFollowing'");
      } else {
        res.send("item not found");
      }
    } catch (err) {
      console.log(err);
      res.send("there was an error");
    }
  }
);

// reset Password ------------------------------------------------------------------------------------------------

userRouter.post("/resetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("reset password for ", email);
    await createResetToken(email);
    return res.sendStatus(200);
  } catch (e) {
    if (e?.message === "No User with this email") {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(500).send({ error: "Unknown Error occurred" });
  }
});

userRouter.post("/resetPassword-confirm", async (req, res) => {
  const { id, token, password } = req.body;
  const isValidResetProcess = validateResetToken(id, token);
  try {
    if (!isValidResetProcess) {
      throw new Error("NonValidResetProcess");
    }

    const user = await User.findById(id);
    user.setPassword(password);

    await user.save();
    return res.send({
      data: { message: "New password confirmed" },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

// logout ---------------------------------------------------------------------------------------------

userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.send("OK");
});

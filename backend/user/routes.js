import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";
import { v2 as cloudinary } from "cloudinary";

export const userRouter = Router();
const img_upload = multer({ storage: multer.memoryStorage() });

const multerMiddleware = multer();

// get all users -------------------------------------------------------------------------------------------

userRouter.get("/", async (req, res) => {
  const users = await User.find().populate("posts");
  res.send(users);
});

// signup --------------------------------------------------------------------------------------------------

userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  newUser.setPassword(req.body.password);
  try {
    await newUser.save();
    return res.send({
      data: {
        message: "New user created",
        user: { name, email },
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
  console.log(req.userEmail);
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
    // const userData = await User.find({ _id: userId }).populate("posts");
    const userData = await User.find({ _id: userId });
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

// add likes to account of logged in user

// delete likes from account of logged in user

// add following to account of logged in user

// delete following from account of logged in user

// reset Password ---------------------------------------------------------------------------------------------

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

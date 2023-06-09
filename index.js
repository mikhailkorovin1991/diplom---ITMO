import express from "express";
import multer from "multer";
//import cors from 'cors';

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from ".validations/auth.js";

import { handleValidationErrors, checkAuth } from "./utils/index.js";

import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://kosms191:<password>@cluster0.wgi3rlk.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
const storage = multer.diskStorage({
  dectination: (_, _, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
/*
app.get("/", (req, res) => {
  res.send("Hello World!");
}); */

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

console.log(req.body);

if (req.body.email === "test@test.ru") {
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "Михаил Коровин",
    },
    "secret123"
  );
}
res.json({
  success: true,
  token,
});

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: "/uploads/${req.file.originalname}",
  });
});

app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

//app.get("/post", checkAuth, UserController.getMe);
//app.get("/post", checkAuth, UserController.getMe);
//app.get("/post", checkAuth, UserController.getMe);
//app.get("/post", checkAuth, UserController.getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});

import express from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controller/user.controller.js";
import { JWTauthentication } from "../middlewere/auth.middlewere.js";

import upload from "../middlewere/multer.middlewere.js";

const router = express.Router();

router.route("/register").post(upload.single("profile"), registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-access").post(refreshAccessToken);
router.route("/logout").post(JWTauthentication, logoutUser);
// router.post("/password-reset", initiatePasswordReset);
// router.post("/reset-password", resetPassword);

export default router;

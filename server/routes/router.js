import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

import authenticate from "../middleware/authenticate.js";
import userdb from "../models/userSchema.js";

import { registration } from "../controllers/registrationController.js";
import { login } from "../controllers/loginController.js";
import { uservalid } from "../controllers/userValidController.js";
import { logout } from "../controllers/logoutController.js";

const router = new express.Router();
const keysecret = process.env.SECRET_KEY;

// email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// for user registration

router.post("/register", registration); //registration logic or async function which is comming from registrationController inside controllers.

// user Login

router.post("/login", login);

// user valid
router.get("/validuser", authenticate, uservalid);

// user logout

router.get("/logout", authenticate, logout);

// send email Link For reset Password
router.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await userdb.findOne({ email: email });
    console.log(userfind);

    // token generate for reset password
    const token = jwt.sign({ _id: userfind._id }, keysecret, {
      expiresIn: "120s",
    });
    console.log(token);

    const setusertoken = await userdb.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    console.log(setusertoken);

    if (setusertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For password Reset",
        text: `This Link Valid For 2 Minutes http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res.status(201).json({ status: 201, message: "Email sent Succsfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token", async (req, res) => {
  console.log(req.params);

  const { id, token } = req.params;

  try {
    const validuser = await userdb.findOne({ _id: id, verifytoken: token });
    console.log(validuser);

    const verifytoken = jwt.verify(token, keysecret);
    console.log(verifytoken);

    if (validuser && verifytoken._id) {
      res.status(201).json({ status: 201, uservalid });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// change password

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    //valid user
    const validuser = await userdb.findOne({ _id: id, verifytoken: token });
    const verifyToken = jwt.verify(token, keysecret);

    if (validuser && verifyToken._id) {
      //hash password
      const newpassword = await bcrypt.hash(password, 12);

      // update new password

      const setnewuserpass = await userdb.findByIdAndUpdate({ _id: id }, { password: newpassword });

      //save password
      setnewuserpass.save();

      res.status(201).json({ status: 201, setnewuserpass });
    } else {
      res.status(401).json({ status: 401, message: "user doesn't exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

export default router;

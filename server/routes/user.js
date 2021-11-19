const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  console.log("user >> ", user);
  user.save((err, user) => {
    console.log("[ Server ] register user >> ", user);
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    console.log("[ Server ] login user >> ", user);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There is no user who corresponds to the ID",
      });
    }

    user.isTruePassword(req.body.password, (err, isTrue) => {
      if (!isTrue) {
        return res.json({
          loginSuccess: false,
          message: "The password doesn't match",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    isAuth: true,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;

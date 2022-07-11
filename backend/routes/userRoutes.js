const express = require("express");

const {
  loginUser,
  logoutUser,
  signupUser,
  signupTeacher,
} = require("../controllers/userController");

const {
  isAuth,
  isTeacher,
  isStudent,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginUser, (req, res) => {
  if (!req.user) {
    res.status(401).send("Login Failed");
  } else {
    const user = req.user;
    res.json({ email: user.email });
  }
});

router.post("/logout", logoutUser);

router.post("/isLoggedIn", isAuth, (req, res) => {
  res.status(200).json({ msg: "You are logged in" });
});

router.post("/signupTeacher", signupTeacher);
router.post("/signup", signupUser);

module.exports = router;
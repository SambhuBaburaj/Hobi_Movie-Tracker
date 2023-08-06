var express = require("express");
const { CreateAccount } = require("../Controller/Register/Create-account");
const { login } = require("../Controller/Register/login");
const {
  Homepage,
  AddPlaylist,
  addingplaylist,
} = require("../Controller/HomePage/PlayList");
const { Profile } = require("../Controller/Profile/profile");
const { SessionCheck } = require("../Controller/HomePage/SessionCheck");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.user) {
    res.redirect("/homepage");
  } else {
    res.render("login", { title: "Express" });
  }
  console.log("loginpage");
});
router.post("/Create-account", CreateAccount);
router.post("/login", login);

router.get("/home",SessionCheck, function (req, res, next) {
  res.render("Home", { title: "Express" });
});
router.get(
  "/homepage",
  function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/");
    }
  },
  Homepage
);
router.get("/profile",SessionCheck,Profile, function (req, res, next) {
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.render("login", {
    logout: "logout Success",
  });
});
router.post("/addplaylist",SessionCheck, AddPlaylist);
router.post("/addingtoplaylist",SessionCheck, addingplaylist);

module.exports = router;

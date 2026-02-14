const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user");

const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "secrete_key");
      res.cookie("token", token);
      res.redirect("login");
    });
  });
});

//----------------------------------------------------------------------------------------------------
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something went wrong !!!");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "secrete_key");
      res.cookie("token", token);
      res.send("You are IN");
    } else res.send("Something went Wrong !!!");
  });
});

//------------------------------------------------------------------------------------------
app.get("/logout", (req, res) => {
  res.cookie("token", "");
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

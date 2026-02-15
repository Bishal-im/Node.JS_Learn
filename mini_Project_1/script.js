const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const post = require("./models/post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  let { name, username, age, email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) return res.status(500).send("User Already Registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });

      let token = jwt.sign({ email: email, userid: user._id }, "secret_Key");
      res.cookie("token", token);
      res.send("Registered");
    });
  });
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) return res.status(500).send("SomeThing went Wrong !!!");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // ✅ CORRECT ORDER:
      // 1. Create token
      let token = jwt.sign({ email: email, userid: user._id }, "secret_Key");

      // 2. Set cookie FIRST
      res.cookie("token", token);

      // 3. Redirect LAST (after cookie is set)
      return res.status(200).redirect("/profile");
    } else {
      return res.redirect("/login");
    }
  });
});

// protected route
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  await user.populate("posts"); //👉 It replaces the ObjectIds with the actual post documents.
  res.render("profile", {
    user,
  });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let user = await postModel.findOne({ _id: req.params.id }).populate("user"); // here user is id that populate

  post.likes.push(req.user.userid);
  await post.save();
  res.redirect("/profile");
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content: content,
  });

  user.posts.push(post._id); // user ma ni post vako if id tw dinu pareo
  await user.save();
  res.redirect("/profile");
});

app.get("/logout", async (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

// middleware for a protected route
function isLoggedIn(req, res, next) {
  // Check if token doesn't exist or is empty
  if (!req.cookies.token) {
    res.redirect("/login");
  } else {
    try {
      let data = jwt.verify(req.cookies.token, "secret_Key");
      req.user = data;
      next();
    } catch (error) {
      res.send("Invalid or expired token");
    }
  }
}

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

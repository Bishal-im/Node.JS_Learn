const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const { name } = require("ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, img } = req.body;

  let createdUser = await userModel.create({
    name, // name = name;   // cuz html ma ni name nai xa class am
    email,
    img,
  });
  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

app.get("/delete/:id", async (req, res) => {
  let allUsers = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  let { NEWname, NEWemail, NEWimg } = req.body;
  let editUser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: NEWname, email: NEWemail, img: NEWimg },
    { new: true },
  );

  res.redirect("/read");
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

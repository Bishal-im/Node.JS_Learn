const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("OMG");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Bishal",
    email: "Bishalpandye@gmail.com",
    age: 23,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "Hello this is my DATA",
    user: "6989bc48f8846996d48023f7",
  });

  let user = await userModel.findOne({ _id: "6989bc48f8846996d48023f7" });
  user.posts.push(post._id);
  await user.save(); //we done changes manully so we need to save()

  res.send({ post, user });
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

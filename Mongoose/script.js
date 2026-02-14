const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Bishal_02",
    email: "pandeybishal@gmail.com_02",
    username: "Bishal_02",
  });
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let updateUser = await userModel.findOneAndUpdate(
    { username: "Bishal" },
    { username: "Bishal Pandey" },
    { new: true }
  );
  res.send(updateUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find({ username: "Bishal_02" });
  res.send(users);
});

app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "Bishal_02" });
  res.send(users);
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

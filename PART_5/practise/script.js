const express = require("express");
const app = express();
const path = require("path");

// parsers (not bodyparser)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//setting up static ( html , css , images )
app.use(express.static(path.join(__dirname, "public"))); // here full path is given

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  res.send("Welcome back " + req.params.username);
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

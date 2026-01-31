const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files }); // here { files: files } sending file in ejs as promps
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  ); // files ma chai tye haleko body ko name bata create hunxa
});

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", {
      filename: req.params.filename,
      filedata: filedata,
    }); //ejs
  });
});

app.get("/edit/:filename", (req, res) => {
  const filename = req.params.filename; // get dynamic filename from URL
  res.render("edit", { filename }); // pass it to EJS
});

app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.New}.txt`,
    (err) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

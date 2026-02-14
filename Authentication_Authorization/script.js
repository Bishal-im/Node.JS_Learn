const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "Bishal");
  res.send("done");

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("My password", salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash);
    });
  });
});

app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("read page");
  bcrypt.compare(
    "My password",
    "$2b$10$ZskK9C3B54kZ3X9sGgRom.Q9mCP0gTzbmZpg.tTKy5TPXsex2oH2u",
    function (err, result) {
      // result == true
      console.log(result);
    },
  );
});

// JWT LEARN
app.get("/jwt", (req, res) => {
  let token = jwt.sign({ email: "Bishalpandey@gmail.com" }, "secret");
  console.log(token);
  res.cookie("token", token);
  res.send("done");
});

app.get("jwtRead", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

const express = require("express");
const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true }));

//lets setup middleare
app.use(function (req, res, next) {
  console.log("Middleware hore");
  next();
});

//routes setup
app.get("/", (req, res) => {
  res.send("Hello world bro....");
});

app.get("/product", (req, res) => {
  res.send("Home ma ja, product herxas");
});

app.get("/profile", (req, res, next) => {
  // error handler chaluna next () lako
  return next(new Error("Somethinig went wrong")); // yo chai if ya errror aako vaye yehi prb rukos so..........
});

//last ma sadhai , ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke !"); // yo fornted ma janxa
});

// port bro
app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

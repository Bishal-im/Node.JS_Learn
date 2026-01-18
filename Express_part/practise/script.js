const express = require("express");
const app = express();

app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("1st middleware ", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("2nd middleware ", req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log("3rd bitch", req.url, req.method);
//   res.send(" <h1>3rd wala chaleo hai </h1>");
// });

app.get("/", (req, res, next) => {
  console.log("Handling /  ", req.url, req.method);
  res.send("<h1> You are on Home page </h1>");
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us  ", req.url, req.method);
  res.send(`
    <h1>Details de tero:</h1>

    
<form action="/contact-us" method="POST">
  <input type="name" name="name" placeholder="Enter name">
  <br><br>

  <input type="email" name="email" placeholder="Enter email">
  <br><br>


  <input type="submit" />
</form>

    
    `);
});

app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us  POST", req.url, req.method, req.body);
  res.send(`
    <h1>Paye tero details</h1>`);
});

app.listen(3000, () => {
  console.log(`Server running on address http://localhost:3000`);
});

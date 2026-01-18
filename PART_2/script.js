const fs = require("fs");

fs.writeFile("./PART_2/Create.txt", "Mero mailo commit hai", function (err) {
  if (err) {
    console.log(err);
  } else console.log("Vayo");
});

fs.appendFile("Create.txt", "\nYo Kura chai append garam hai", function (err) {
  if (err) {
    console.log(err);
  } else console.log("Done");
});

fs.rename("Create.txt", "Change.txt", (err) => {
  if (err) {
    console.log(err);
  } else console.log("Aayena Error");
});

fs.copyFile("Change.txt", "Copy.txt", (err) => {
  if (err) {
    console.log(err);
  } else console.log("Vayo Copy pani");
});

fs.unlink("Copy.txt", (err) => {
  if (err) console.log("Error occurred");
  else console.log("File deleted successfully");
});

fs.rmdir("./rmdir_FOL", (err) => {
  if (err) console.log(err.message);
  else console.log("Directory removed");
});

fs.rm("./try_DELETE", { recursive: true }, (err) => {
  if (err) console.log(err.message);
  else console.log("Directory removed");
});

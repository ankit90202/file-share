const express = require("express");
const socket = require("socket.io");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
}).single("user");

let fileArray = [];

app.post("/profile", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.send({ msg: "success" });
    } else {
      fs.readdir("./public/uploads", (err, files) => {
        files.forEach((file, index) => {
          fileArray.push(file);
        });
      });
    }
  });
  next();
});

console.log(fileArray);

app.post("/profile", (req, res, next) => {
  res.redirect("/");
  io.on("connection", (socket) => {
    io.emit("bot", fileArray);
  });
  next();
});

app.get("/files", (req, res) => {
  res.send({ files: fileArray });
});

const port = 3000;
const server = app.listen(port, () =>
  console.log(`Server is listing to port : ${port}`)
);
const io = socket(server);

io.on("connection", (socket) => {
  socket.emit("user", "You connected");
  socket.broadcast.emit("user", "New User connected !!!!");
  socket.on("disconnect", () => {
    io.emit("user", "user Disonnected");
  });
});

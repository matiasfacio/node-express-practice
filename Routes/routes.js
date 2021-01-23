const express = require("express");
const fs = require("fs");

const route = express.Router();

// middleware

route.use((req, res, next) => {
  const date = new Date();
  console.log("date:", date);
  next();
});

route.use(express.json());

// routes

route.get("/", (req, res) => {
  res.send("<h1>HOME</h1>");
});
route.get("/aboutme", (req, res) => {
  res.send("<h1>ABOUT ME</h1>");
});

route.post("/createfile", (req, res) => {
  console.log(req.body);
  fs.writeFile("infos.txt", req.body.name, "utf-8", (err) => {
    if (err) {
      return console.log("error:", err);
    }
    res.send("File was created!");
  });
});

route.delete("/deletefile", (req, res) => {
  fs.access("infos.txt", (err) => {
    if (err) return res.status(500).send("file does not exist");
    fs.unlink("infos.txt", (err) => {
      if (err) return console.log("error:", err);
      res.status(200).send("file was deleted");
    });
  });
});

route.get("*", (req, res) => {
  res.status(404).send("Error 404 - Page doens't exist");
});

module.exports = route;

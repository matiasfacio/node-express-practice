const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");

const routeadmin = express.Router();
routeadmin.use(express.json());

routeadmin.post("/login", (req, res) => {
  bcrypt.hash(req.body.email, 10, (err, data) => {
    if (err) return res.send("error");
    fs.access("pass.txt", (err) => {
      if (err) {
        fs.writeFile("pass.txt", data, (err) => {
          if (err) return res.send("error creating file");
          res.send("your password was saved");
        });
      }
      fs.readFile("pass.txt", "utf-8", async (err, storepass) => {
        const result = await bcrypt.compare(req.body.email, storepass);
        if (result) return res.send("welcome back!");
        res.send("wrong password");
      });
    });
  });
});

routeadmin.get('/login', (req, res) => {
    res.send('<h2>you need to login first</h2>')
})

module.exports = routeadmin;

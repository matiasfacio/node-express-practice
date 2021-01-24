const express = require("express");
const redis = require("redis");
const session = require("express-session");
const redisStore = require("connect-redis")(session);
const client = redis.createClient();
const app = express();
const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");

app.use(helmet());
app.use(
  session({
    secret: "ssshhhhh",
    // create new redis store.
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: client,
      ttl: 260,
    }),
    saveUninitialized: false,
    resave: false,
  })
);

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // res.sendFile('index.html')  // here I can use both, sendFile or redirect
  res.redirect("index.html");
});

app.post("/login", (req, res) => {
    console.log(req.session.key);
  if (!req.session.key) {
    req.session.key = req.body.userid;
    return res.redirect('admin.html')
  } 
    res.redirect("index.html");
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/admin", (req, res) => {
  console.log("im here");
  // create new session object.
  if (req.session.key) {
    // if email key is sent redirect.
    return res.redirect("admin.html");
  }
  res.status(403).redirect("incomplete.html"); // redirect is possible to use when the path was already defined with express.static
});

app.listen(5000, () => {
  console.log("listening");
});

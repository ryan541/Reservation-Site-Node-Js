"use strict";
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
// const encoder = bodyParser.urlencoded();
const bcrypt = require("bcrypt");
var session = require("express-session");
const app = express();
const passport = require("passport");

app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
//enables css files to be loaded in views
app.use(express.static(__dirname + "/public"));
//enables ejs files to be loaded
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
//app.use(session({ secret: "10" }));
app.set("view engine", "ejs");

//database script
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ireserve",
});
//connection to the database
con.connect((err) => {
  if (err) throw err;
  else console.log("Connected Successfully!");
});

app.post("/signUp", async (req, res) => {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ireserve",
  });
  con.connect();
  //const jsonContent = JSON.stringify(data);
  const data = {
    Name: req.body.username,
    Email: req.body.email,
    Password: bcrypt.hashSync(req.body.password, 10),
  };

  let sql = "INSERT INTO customers Set?";
  con.query(sql, data, (err, result) => {
    if (err) throw err;
    //res.send(result);
  });
  res.redirect("/login");
  console.log(data);
});

app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var user = {
    username: username,
    password: password,
  };
  console.log(user);
  con.query(
    "Select * from customers where Name=? ",
    [username],
    (err, results) => {
      console.log(results);
      console.log(err);
      if (results.length == 0) {
        res.status(401).redirect("/login");
      } else {
        if (bcrypt.compareSync(password, results[0].Password)) {
          req.session.user = results[0];
          res.status(200).redirect("/order");
        } else {
          res.status(401).json({ message: "Username does not exist" });
        }
      }
    }
  );
});

app.get("/homepage", (req, res) => {
  res.render("homepage.ejs", {
    Name: req.session.user.Name,
  });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.get("/signUp", checkNotAuthenticated, (req, res) => {
  res.render("signUp.ejs");
});

app.get("/kfc", (req, res) => {
  res.render("kfc.ejs");
});

app.get("/chickenInn", (req, res) => {
  res.render("chickenInn.ejs");
});

app.get("/landing", (req, res) => {
  res.render("landing2.ejs");
});

app.get("/order", (req, res) => {
  res.render("order.ejs");
});

app.listen(3000, () => {
  console.log("Listening on Port 3000...");
});

//middleware routing
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/homepage");
  }
  res.redirect("/login");
}
//middleware routing
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

// connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
//   if (error) {
//     console.log(error);
//     res.status(500).send('Server error');
//   } else if (results.length == 0) {
//     res.status(401).send('Invalid username or password');
//   } else {
//     // Check if password is correct
//     if (results[0].password === password) {
//       res.send('Login successful');
//     } else {
//       res.status(401).send('Invalid username or password');
//     }
//   }
// });

// app.post("/login", (req, res, next) => {
//   const { email, password } = req.body;
//   let sql = `SELECT * FROM customers  where Email="${email}"`;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     //res.send(result);
//     if (result[0]) {
//       if (bcrypt.compareSync(password, result[0].Password)) {
//         return res.render("/homepage", { name: result[0].Name });
//       }
//       return res
//         .status(401)
//         .json({ url: "/login", message: "Incorrect Password" });
//     }
//     return res.status(401).json({ url: "/login", message: "Unauthorized" });
//   });
// });

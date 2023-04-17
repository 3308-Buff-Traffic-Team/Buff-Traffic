const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const axios = require('axios');

// db config
const dbConfig = {
  host: "db",
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

// db test
db.connect()
  .then((obj) => {
    // Can check the server version here (pg-promise v10.1.0+):
    console.log("Database connection successful");
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.json());

// set session
app.use(
  session({
    secret: "XASDASDA",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var user = {
  user_id: undefined,
  // username: undefined,
  password: undefined,
  // first_name: undefined,
  // last_name: undefined,
  email: undefined
  // year: undefined,
  // major: undefined,
  // degree: undefined,
};

//basically just imported from lab 8

app.get("/", (req, res) => {
  //res.render("pages/home");
  res.render("pages/test", {user: req.session.user.user_id });
});

app.get("/test", (req, res) => {
  res.render("pages/test", {user: "nobody"});
});

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

app.get('/login', (req, res) => {
  res.render('pages/login');

});
app.get('/register', (req, res) => {
  res.render('pages/register');
});
app.post('/register',  async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const query = 'INSERT INTO users (email, password) VALUES ($1, $2);'
  db.any(query, [req.body.email, hash])
    .then(function(data){
      res.status(200).redirect('/login');
    })
    .catch(err => {
      alert(err);
    })
});

app.post('/login', (req, res) => {
  const query = `select email, password, user_id from users where email = $1;`;
  
  db.any(query, [req.body.email])
    .then(async (data) => {
      if (data[0]){
        const match = await bcrypt.compare(req.body.password, data[0].password);
        if ((req.body.username == data[0].username) && (match)){
          user.user_id = data[0].user_id;
          user.password = data[0].password;
          user.email = data[0].email;
          req.session.user = user;
          req.session.save();
          return res.redirect('/');
        } else {
          return res.redirect('/register');
        }
      } else {
        return res.redirect('/register');
      }
    })
    .catch((err) => {
      console.log(err);
      return res.redirect('/login');
    });
});


module.exports = app.listen(3000);
//app.listen(3000);


console.log("Server is listening on port 3000");

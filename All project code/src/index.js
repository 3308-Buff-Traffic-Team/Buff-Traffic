const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const axios = require('axios');

app.use(express.static('resources'))

const path = require('path')
// To specify path for static files for UI
app.use(express.static(path.join(__dirname,'/')));
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


//basically just imported from lab 8

app.get("/", (req, res) => {
  //res.render("pages/home");
  res.render("pages/home", {loggedIn: req.session.user});
});

app.get("/test", (req, res) => {
  res.render("pages/test", {user: "nobody"});
});

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get('/home', (req, res) => {
  res.render('pages/home', {loggedIn: req.session.user});
  
});

app.get('/login', (req, res) => {
  res.render('pages/login', {loggedIn: req.session.user});
});

app.get('/register', (req, res) => {
  res.render('pages/register', {loggedIn: req.session.user});
});

app.post('/register',  async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const query = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4);'
  if (req.body.password.length < 6){
    //return res.json({status: 'Error', message: 'Password too short'});
   // res.status(400).redirect('/register');
    // res.json({status: "Error", message: 'Password too short'});
    res.status(400).render('pages/register', {error: true, message:"Password must be 6 characters or longer", loggedIn: undefined });
    // return res.status(400).redirect('/register');
  }
  db.any(query, [req.body.email, hash, req.body.firstname, req.body.lastname])
    .then(function(data){
     // res.json({status: 'Success', message: 'Success'});
     return res.status(200).redirect('/login');
    })
    .catch(err => {
      // alert(err);
      console.log(err);
    })
});

app.post('/login', (req, res) => {
  const query = `select * from users where users.email = $1;`;

  db.any(query, [req.body.email])
    .then(async (data) => {
      if (data[0]){
        const match = await bcrypt.compare(req.body.password, data[0].password);
        if ((req.body.username == data[0].username) && (match)){
          req.session.user = data[0];
          delete(req.session.user.password)
          req.session.save();
          return res.status(200).redirect('/home');
        } else {
          res.json({status: 403, message: 'Incorrect user or password'});
          // return res.status(403).redirect('/register');
          console.log('inside login failed function');
          res.render('pages/login', {message: "Incorrect username or password", loggedIn: undefined });
          // res.json({status: 403, message: 'Incorrect user or password'}) // Noam
          //return res.status(403).json(); // Noam
        }
      } else {
        // alert("Invalid credentials");
        res.status(403).render('pages/login', {error: true, message: "Incorrect username or password", loggedIn: undefined});

        // return res.status(404).redirect('/register');
        //return res.status(403).json(); // Noam 
      }
    })
    .catch((err) => {
      console.log(err);
      return res.redirect('/login');
      //return res.status(403).redirect('/login'); // Noam
    });
});

const auth = (req, res, next) => {
  if (!req.session.user) {
    // Default to login page.
    return res.redirect('/login');
  }
  next();
};

app.use(auth);

app.get('/profile', (req, res) => {
  res.render('pages/profile', {loggedIn: req.session.user});

});

module.exports = app.listen(3000);
//app.listen(3000);


console.log("Server is listening on port 3000");

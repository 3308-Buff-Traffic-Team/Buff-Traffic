const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const bodyParser = require("body-parser");
const session = require("express-session");

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

const user = {
  student_id: undefined,
  username: undefined,
  password: undefined
  // first_name: undefined,
  // last_name: undefined,
  // email: undefined,
  // year: undefined,
  // major: undefined,
  // degree: undefined,
};

//basically just imported from lab 8

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/test", (req, res) => {
  res.render("pages/test");
});

app.get('/welcome', (req, res) => {
  res.json({status: 'success', message: 'Welcome!'});
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

app.get('/login'){
  res.render('/src/views/pages/login.ejs');
};

app.post('/login'){
  const query = `select username,password from users where username = $1;`;
  
  db.any(query, [req.body.username])
    .then(async (data) => {
      user = data[0];
      console.log(user);
      if (data[0]){
        // const match = await bcrypt.compare(req.body.password, data[0].password);
        if ((req.body.username == data[0].username) && (req.body.password == data[0].password)){
          req.session.user = data[0];
          req.session.save();
          return res.redirect('/');
        } else {
          return res.redirect('/register');
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return res.redirect('/login');
    });
};

app.listen(3000);
console.log("Server is listening on port 3000");

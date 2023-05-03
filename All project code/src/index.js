const express = require("express");
const app = express();
const pgp = require("pg-promise")();
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require('bcrypt');
const axios = require('axios');
const schedule = require('node-schedule');


var j = schedule.scheduleJob('* 1 * * * *', function() {  // this for one hour
  console.log('The answer to life, the universe, and everything!');
  var d = new Date();
  var dow = d.getDay() + 1;
  var query = "UPDATE traffic SET hr06 = td.avg_hr06, hr07 = td.avg_hr07, hr08 = td.avg_hr08, hr09 = td.avg_hr09, hr10 = td.avg_hr10, hr11 = td.avg_hr11, hr12 = td.avg_hr12, hr13 = td.avg_hr13, hr14 = td.avg_hr14, hr15 = td.avg_hr15, hr16 = td.avg_hr16, hr17 = td.avg_hr17, hr18 = td.avg_hr18, hr19 = td.avg_hr19, hr20 = td.avg_hr20, hr21 = td.avg_hr21, hr22 = td.avg_hr22, hr23 = td.avg_hr23, hr24 = td.avg_hr24 FROM ( SELECT roomid, AVG(CASE WHEN hr06 >= 0 THEN hr06 ELSE NULL END) AS avg_hr06, AVG(CASE WHEN hr07 >= 0 THEN hr07 ELSE NULL END) AS avg_hr07, AVG(CASE WHEN hr08 >= 0 THEN hr08 ELSE NULL END) AS avg_hr08, AVG(CASE WHEN hr09 >= 0 THEN hr09 ELSE NULL END) AS avg_hr09, AVG(CASE WHEN hr10 >= 0 THEN hr10 ELSE NULL END) AS avg_hr10, AVG(CASE WHEN hr11 >= 0 THEN hr11 ELSE NULL END) AS avg_hr11, AVG(CASE WHEN hr12 >= 0 THEN hr12 ELSE NULL END) AS avg_hr12, AVG(CASE WHEN hr13 >= 0 THEN hr13 ELSE NULL END) AS avg_hr13, AVG(CASE WHEN hr14 >= 0 THEN hr14 ELSE NULL END) AS avg_hr14, AVG(CASE WHEN hr15 >= 0 THEN hr15 ELSE NULL END) AS avg_hr15, AVG(CASE WHEN hr16 >= 0 THEN hr16 ELSE NULL END) AS avg_hr16, AVG(CASE WHEN hr17 >= 0 THEN hr17 ELSE NULL END) AS avg_hr17, AVG(CASE WHEN hr18 >= 0 THEN hr18 ELSE NULL END) AS avg_hr18, AVG(CASE WHEN hr19 >= 0 THEN hr19 ELSE NULL END) AS avg_hr19, AVG(CASE WHEN hr20 >= 0 THEN hr20 ELSE NULL END) AS avg_hr20, AVG(CASE WHEN hr21 >= 0 THEN hr21 ELSE NULL END) AS avg_hr21, AVG(CASE WHEN hr22 >= 0 THEN hr22 ELSE NULL END) AS avg_hr22, AVG(CASE WHEN hr23 >= 0 THEN hr23 ELSE NULL END) AS avg_hr23, AVG(CASE WHEN hr24 >= 0 THEN hr24 ELSE NULL END) AS avg_hr24 FROM traffic_day WHERE weekda = $1 GROUP BY roomid ) AS td WHERE traffic.roomid = td.roomid;"
  db.any(query, [dow])

});

app.use(express.static('resources'))

const path = require('path')
// To specify path for static files for UI
app.use(express.static(path.join(__dirname, '/')));
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
  // res.render("pages/home", {loggedIn: req.session.user});
  res.redirect('/home');
});

app.get("/test", (req, res) => {
  res.render("pages/test", { user: "nobody" });
});

app.get('/welcome', (req, res) => {
  res.json({ status: 'success', message: 'Welcome!' });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.get('/home', (req, res) => {
  const query = "select * from traffic;";
  const now = new Date();
  const options = { timeZone: 'America/Denver', hour12: false, hour: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const mtDayOfWeek = now.getDay() + 1; //i dont think this is mountain? fk it we ball tho
  const mtHour = formatter.format(now);
  console.log('Day of week:', mtDayOfWeek);
  console.log('current hour: ', mtHour);
  //console.log('TESTTTTT', req.session.user.user_id, req.session.user.first_name);

  const query2 = `SELECT AVG(CASE WHEN hr${mtHour} >= 0 THEN hr${mtHour} ELSE NULL END) FROM traffic_day WHERE name = 'Rec Center Main Weight Room' AND weekda = ${mtDayOfWeek};`
  //i just need name, hr, that's it?
  const query4 = `SELECT * from user_favorites where user_id = '${req.session.username}'`;

  const query3 = `SELECT name, hr${mtHour} AS avg_traffic FROM traffic WHERE name IN ('Rec Center Main Weight Room', 'Competition Pool', 'Buffalo Pool', 'Level 1 Stretching/Ab Area', 'Squash & Racquetball Courts', 'Mat Room', 'Cycle Studio', 'Turf Gym', 'Pool Overlook Cardio', 'Mind Body Studio', 'Ice Rink', 'Climbing Gym', 'Upper Gym', 'Ping Pong Lounge', 'Lower Gym', 'Front Lobby Cardio Equipment', 'Will Vill - Main Weight Room', 'Dive Well', 'Tennis Court 1', 'Tennis Court 2', 'Tennis Court 3', 'Studio 1', 'Studio 2', 'Studio 3', 'Studio 4W', 'Studio 4F', '2nd Floor TRX Room', '2nd Floor Cardio Balcony', '2nd Floor Fitness Studio') AND weekda = ${mtDayOfWeek} LIMIT 40;`;
  console.log(query3);
  if (req.session.user) {
    const query5 = `SELECT DISTINCT t.name, CASE WHEN uf.user_id IS NOT NULL THEN 'favorite' ELSE 'available' END AS status FROM traffic t LEFT JOIN user_favorites uf ON t.name = uf.name AND uf.user_id = ${req.session.user.user_id} ORDER BY status DESC, t.name ASC;`;


    console.log(query5);
    db.any(query5)
      .then(function(data) {
        if (data) {
          console.log("THIS IS THE DATA FOR FAVORITES", data);
          res.render('pages/home', { loggedIn: req.session.user, rooms: data });
        } else {
          // res.render('pages/home', {loggedIn: req.session.user, favorites: data});
          res.render('pages/home', { loggedIn: req.session.user, favorites: [], error: true, message: "Could not load rooms" });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  // Display all the rooms to the users who are not logged in and do not have favorites
  else {
    db.any(query3)
      .then(function(data) {
        if (data) {
          console.log("THIS IS THE DATA FOR ALL ROOMS", data);
          res.render('pages/home', { loggedIn: req.session.user, rooms: data });
        } else {
          // console.log(data);
          // res.render('pages/home', {loggedIn: req.session.user, rooms: data});
          res.render('pages/home', { loggedIn: req.session.user, rooms: [], error: true, message: "Could not load rooms" });
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log("This is the end of the home index.js function")
  }
});


app.get('/login', (req, res) => {
  res.render('pages/login', { loggedIn: req.session.user });
});

app.get('/register', (req, res) => {
  res.render('pages/register', { loggedIn: req.session.user });
});

app.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const query = 'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4);'
  if (req.body.password.length < 6) {
    //return res.json({status: 'Error', message: 'Password too short'});
    // res.status(400).redirect('/register');
    // res.json({status: "Error", message: 'Password too short'});
    res.status(400).render('pages/register', { error: true, message: "Password must be 6 characters or longer", loggedIn: undefined });
    // return res.status(400).redirect('/register');
  }
  db.any(query, [req.body.email, hash, req.body.firstname, req.body.lastname])
    .then(function(data) {
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
      if (data[0]) {
        const match = await bcrypt.compare(req.body.password, data[0].password);
        if ((req.body.username == data[0].username) && (match)) {
          req.session.user = data[0];
          delete (req.session.user.password)
          req.session.save();
          return res.status(200).redirect('/home');
        } else {
          res.json({ status: 403, message: 'Incorrect user or password' });
          // return res.status(403).redirect('/register');
          console.log('inside login failed function');
          res.render('pages/login', { message: "Incorrect username or password", loggedIn: undefined });
          // res.json({status: 403, message: 'Incorrect user or password'}) // Noam
          //return res.status(403).json(); // Noam
        }
      } else {
        // alert("Invalid credentials");
        res.status(403).render('pages/login', { error: true, message: "Incorrect username or password", loggedIn: undefined });
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

app.post('/addfavorite', (req,res) =>{
  // const query = `SELECT roomid from traffic where name = '${req.body.name}'`;
  const query1 = `SELECT user_id from users where email = '${req.session.user.email}';`;
  const query2 = `INSERT INTO user_favorites (user_id, name) values ($1, $2);`;
  var user_id = undefined;
  
  if(req.session.user){
    db.any(query1)
    .then((data) => {
      user_id = data[0].user_id;
      db.any(query2, [user_id, req.body.name])
      .then(info => {
        console.log("Successfully added to favorites");
      })
      .catch(err => {
        console.log(err);
        console.log("Could not add to favorites");
      })
    })
    .catch((err) => {
      console.log(err);
  
    });
  } else {
    console.log("Users must be logged in to add to favorites");
  }
});

app.delete('/delfavorite', (req,res) => {
  const query1 = `SELECT user_id from users where email = '${req.session.user.email}';`;
  var user_id;
  if (req.session.user){
    db.any(query1)
    .then((data) => {
      user_id = data[0].user_id;
      const query2 = `DELETE FROM user_favorites WHERE (user_id = '${user_id}' and name = '${req.body.name}');`;
      db.any(query2)
      .then((info) => {
        console.log("Successfully removed room from favorites");
      })
      .catch((err) => {
        console.log(err);
        console.log("Failed to remove room from favorites");
      });
    })
    .catch((err) => {
      console.log(err);
      console.log("Could not obtain required info to remove from favorites");
    });

  } else {
    console.log("Users must be logged in to delete favorites");
  }
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
  res.render('pages/profile', { loggedIn: req.session.user });

});

module.exports = app.listen(3000);
//app.listen(3000);

console.log("Server is listening on port 3000");

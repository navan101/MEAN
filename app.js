var express = require("express");
var app = express();
var path = require("path");
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var routes = require("./routes/routes");
var business_user = require("./business/users");
var business_about = require("./business/about");
var business_app = require("./business/app");

var mongoose = require("mongoose");
// config files
var db = require("./config/db");
//connect
mongoose.connect(db.url);

require("node-offline-localhost").always();
//require("node-offline-localhost").ifOffline();
// require("node-offline-localhost").ifOfflineAtStartUp();
// console.log(process.env.NODE_ENV)
// if(process.env.NODE_ENV === "development"){
//     require("node-offline-localhost").always();
// }


app.use(express.static(path.join(__dirname, "public")));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({ secret: 'shhsecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use("/", routes);
app.use("/",business_app);
app.use("/",business_about);
app.use("/",business_user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send('404: Page not Found');
});

var port = process.env.PORT || 3000; // set our port
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user

module.exports = app;







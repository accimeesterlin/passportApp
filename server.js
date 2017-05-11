var express = require("express"),
    handlebars =  require("express-handlebars"),
    methodOverride = require("method-override"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    session = require("express-session"),
    env = require("dotenv");


var app = express(),
    port = process.env.PORT || 8080;

app.use(express.static(process.cwd() + "/app/public"));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // Session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(methodOverride("_method"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");

var routes = require("./controllers/appControllers.js");
app.use("/", routes);



require("./config/passport/passport.js")(passport, db.user);

db.sequelize.sync().then(function () {
    console.log("Nice! Database looks fine!");

    app.listen(port, function (err, data) {
        if(err) throw err;
        console.log("App's starting at " + port);
    });

}).catch(function (err) {
    if(err) throw err;
    console.log("Site is live!");
});




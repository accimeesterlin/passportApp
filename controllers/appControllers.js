/**
 * Created by esterlingaccime on 5/10/17.
 */
var express = require("express");
var passport = require("passport");

var router = express.Router();

// Verified that the user needs to sign in
var isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/signin");
};

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});


router.get("/dashboard", isLoggedIn, function (req, res) {
    res.render("dashboard");
});


router.post('/signup', passport.authenticate("local-signup", {
    successRedirect: '/dashboard',
    failureRedicrect: '/signup'
}));


router.post('/signin', passport.authenticate("local-signin", {
    successRedirect: '/dashboard',
    failureRedicrect: '/signin'
}));


router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.redirect("/");
    });
});


router.get("/signin", function (req, res) {
    res.render("signin");
});

module.exports = router;
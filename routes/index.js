var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

// LANDING
router.get("/", function (req, res) {
	res.render("landing");
});

// ==============
// Auth Routes
// ==============

// show register form
router.get("/register", function (req, res) {
	res.render("register");
});

// handle sign up logic
router.post("/register", function (req, res) {	
	var newUser = new User({username: req.body.username, password: req.body.password});
	User.register(newUser, req.body.password, function (err, user) {
		if (err){
			req.flash("error", err.message);
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function () {
			req.flash("success", "Welcome to EdaMate " + user.username);
			res.redirect("/educators");
		});
	});
});

// show login form
router.get("/login", function (req, res) {
	res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/educators",
		failureRedirect: "login"
	}), function (req, res) {	
});

// logout route
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("error", "Logged you out");
	res.redirect("/educators");
});

module.exports = router;

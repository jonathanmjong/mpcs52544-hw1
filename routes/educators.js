var express = require("express");
var router = express.Router();
var Educator = require("../models/educator");
var passport = require("passport");
// requiring folder will automatically use index.js so no need to specify file
// index.js is a special name
var middleware = require("../middleware");

// INDEX
// EDUCATORS
router.get("/", function (req, res) {
	// Get all educators from Mongodb
	Educator.find({}, function (err, allEducators) {
		if(err) {
			console.log(err);
		} else {
			res.render("educators/index", {educators: allEducators});
		}
	});
});

// NEW CREATE			
// EDUCATORS
router.post("/", middleware.isLoggedIn, function (req, res) {
	// get data from form and add to educators array
	var educatorNewName = req.body.educatorNewNameFromView;
	var educatorNewImage = req.body.educatorNewImageFromView;
	var educatorNewDescription = req.body.educatorNewDescriptionFromView;
	var educatorNewPrice = req.body.educatorNewPriceFromView;
	var educatorNewAuthor = {
		// req.user is designated object from passport npm package
		id: req.user._id,
		username: req.user.username
	};
	var newEducator = {educatorName: educatorNewName, educatorPrice: educatorNewPrice, educatorImage:educatorNewImage, educatorDescription: educatorNewDescription, educatorAuthor: educatorNewAuthor};
	console.log(newEducator);
	// Create a new educator profile and save to MongoDB
	Educator.create(newEducator, function (err, newlyCreatedEducator) {
		if(err) {
			console.log(err);
		} else {
			// redirect back to educators page
			res.redirect("/educators");
		}
	});
});

// NEW GET FORM
// EDUCATORS
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("educators/new");
});

// SHOW
// EDUCATORS
router.get("/:id", function (req, res) {
	// retrieve educator from DB 
	// populate retrieves all referenced comment IDs and populates dictionary
	Educator.findById(req.params.id).populate("educatorComments").exec(function (err, educatorFromDb) {
		if(err) {
			console.log(err);
			console.log("error at /educators/:id route");
		} else {
			// render show template with retrieved educator
			res.render("educators/show", {educatorFromController: educatorFromDb});
		}
	});
});

// EDIT MAKE CHANGES		
// EDUCATORS
router.put("/:id", function (req, res) {
	// find and update educator profile
	Educator.findByIdAndUpdate(req.params.id, req.body.educatorEditedFromView, function (err, updatedEducator) {
		if (err){
			console.log(err);
			res.redirect("/educators");
		} else {
			res.redirect("/educators/" + req.params.id);
		}
	});
	// redirect to educator page
});

// EDIT GET FORM		
// EDUCATORS
router.get("/:id/edit", middleware.checkEducatorOwnership, function (req, res) {
	Educator.findById(req.params.id, function (err, educatorFromDb) {
		res.render("educators/edit", {educatorFromController: educatorFromDb});	
	});
});

// DESTROY EDUCATOR
// EDUCATORS
router.delete("/:id/delete", middleware.checkEducatorOwnership, function (req, res) {
	Educator.findById(req.params.id, function (err, educatorFromDb) {
		if (err){
			console.log(err);
			res.redirect("/educators");
		} else {
			educatorFromDb.remove(); //can also use findByIdAndRemove
			res.redirect("/educators");
		}
	});
});

module.exports = router;
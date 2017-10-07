// all middleware
var middlewareObjects = {};
var Educator = require("../models/educator");
var Comment = require("../models/comment");


middlewareObjects.checkEducatorOwnership = function (req, res, next) {
	if(req.isAuthenticated()){		
		Educator.findById(req.params.id, function (err, educatorFromDb) {
			if (err){
				console.log(err);
				req.flash("error", "Educator profile not found");
				res.redirect("back");
			} else {
				// is user associated with educator profile?
				// *.equals is Mongoose function to check equality because model id is an object whereas req.user._id is String
				if(educatorFromDb.educatorAuthor.id.equals(req.user._id)){
					next();
				} else {
					// user is not associated with educator profile, redirect
					req.flash("error", "You don't have permission to do that");
					console.log("user not associated with educator profile trying to edit");
					res.redirect("back");
				}
			}
		});
	} else {
		// User is not logged in, redirect
		req.flash("error", "You need to be logged in to do that");
		console.log("User making request to edit or delete educator profile without being logged in");
		res.redirect("back");
	}
}

middlewareObjects.checkCommentOwnership = function (req, res, next) {
	if(req.isAuthenticated()){		
		Comment.findById(req.params.comment_id, function (err, commentFromDb) {
			if (err){
				console.log(err);
				req.flash("error", "Something went wrong, please go back and try again");
				res.redirect("back");
			} else {
				// is user associated with educator profile?
				// *.equals is Mongoose function to check equality because model id is an object whereas req.user._id is String
				if(commentFromDb.commentAuthor.id.equals(req.user._id)){
					next();
				} else {
					// user is not associated with educator profile, redirect
					req.flash("error", "You don't have permission to do that");
					console.log("user not associated with educator profile trying to edit");
					res.redirect("back");
				}
			}
		});
	} else {
		// User is not logged in, redirect
		req.flash("error", "You need to be logged in to do that");
		console.log("User making request to edit or delete educator profile without being logged in");
		res.redirect("back");
	}
}

middlewareObjects.isLoggedIn = function (req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}

module.exports = middlewareObjects
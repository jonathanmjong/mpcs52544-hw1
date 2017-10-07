var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams lets database find ID
var Educator = require("../models/educator");
var Comment = require("../models/comment");
var passport = require("passport");
// requiring folder will automatically use index.js so no need to specify file
// index.js is a special name
var middleware = require("../middleware");

// ===========================
// COMMENTS ROUTES
// ===========================

// NEW CREATE
// COMMENTS
router.post("/", middleware.isLoggedIn, function (req, res) {
	// find educator using ID
	Educator.findById(req.params.id, function (err, educatorFromDb) {
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong, please go back and try again");
			res.redirect("/educators");
		} else {
			// create new comment
			Comment.create(req.body.commentFromView, function (err, newComment) {
				if(err){
					req.flash("error", "Something went wrong, please go back and try again");
					console.log(err);
				} else {
					// add username and id to comment
					newComment.commentAuthor.id = req.user.id;
					newComment.commentAuthor.username = req.user.username;
					newComment.save();
					// save comment
					educatorFromDb.educatorComments.push(newComment);
					educatorFromDb.save();
					req.flash("success", "Successfully posted comment!");
					// redirect to educator show page
					res.redirect("/educators/" + educatorFromDb._id);
				}
			});
		}
	});
});

// NEW GET FORM
// COMMENTS
router.get("/new", middleware.isLoggedIn, function (req, res) {
	// find educator by id
	Educator.findById(req.params.id, function (err, educatorFromDb) {
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {educatorFromController: educatorFromDb});
		}
	});
});

// EDIT MAKE CHANGES
// COMMENTS
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.commentFromView, function (err, updatedComment) {
		if (err){
			res.redirect("back");
		} else {
			// req.params.id is from app.js
			res.redirect("/educators/" + req.params.id);
		}
	});
});

// EDIT GET FORM
// COMMENTS
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
	Comment.findById(req.params.comment_id, function (err, commentFromDb) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			// educator_id is from app.js which isn't shown here
			educator_id = req.params.id;
			res.render("comments/edit", {educatorIdFromController: educator_id, commentFromController: commentFromDb});
		}
	});
});

// DESTROY COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
	// find comment by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, function (err) {
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/educators/" + req.params.id);
		}
	});
});

module.exports = router;
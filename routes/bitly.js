var express = require("express");
var router = express.Router({mergeParams: true}); // mergeParams lets database find ID
// var passport = require("passport");
var middleware = require("../middleware");
// TODO - models/bitly
var Bitly = require("../models/bitly");


router.get("/bitly", middleware.isLoggedIn, function (req, res) {
	Bitly.find({}, function (err, bitlyLinks) {
		if(err) {
			console.log(err);
		} else {
            console.log(bitlyLinks);            
			res.render("mpcs52544/bitly", {bitlyLinks: bitlyLinks});
		}
	});
});

router.post("/bitly", middleware.isLoggedIn, function (req, res) {

    // create new bitly link through adding on count of current bitly links + 1
    Bitly.find().exec(function (err, results) {
        var newBitlyLink = results.length + 1;
        var newRedirectLink = req.body.redirectLinkFromView;
    
        var newBitly = {
            bitly_link: newBitlyLink,
            redirect_link: newRedirectLink
        };
    
        Bitly.create(newBitly, function (err, newlyCreatedBitly) {
            if(err) {
                console.log(err);
            } else {
                req.flash("success", "Successfully created Bitly link! Your new link is: www.jonathanjongdemo.com/bitly/" + newlyCreatedBitly.bitly_link);            
                res.redirect("/bitly");
            }
        });
    });

});

router.get("/bitlyError", function (req, res) {
    res.render("mpcs52544/bitlyError");
});

router.get("/bitly/:bitly_link", function (req, res) {
    // use :bitly_link to get site
    // redirect to link
    var bitly_link = req.params.bitly_link;
    var query = {};
    query['bitly_link'] = bitly_link;

    // $inc updates view count of bitly link

    Bitly.findOneAndUpdate(query, { $inc: { 'num_views': 1 } }, function (err, redirectFromDb) {
        if (err){
            console.log(err);
            res.redirect("/bitly");
        } else {
            if (redirectFromDb){
                console.log("helloooo");
                console.log(redirectFromDb);
                redirectFromDb.last_viewed = new Date();
                redirectFromDb.save();
                // redirect after updating view count
                return res.redirect(301, 'https://' + redirectFromDb.redirect_link);
            } else {
                res.redirect("/bitlyError");
            }
        }
    });
});

module.exports = router;
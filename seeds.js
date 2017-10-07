var mongoose = require("mongoose");
var Educator = require("./models/educator");
var Comment = require("./models/comment");

var data = [
	{
		educatorName: "Jonathan Jong", 
		educatorPrice: "15", 
		educatorImage: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAhPAAAAJDg3YTVmNzEyLWE5N2YtNGI3My1hNTNjLTkzMGRhYWYxYzU4ZQ.jpg",
		educatorDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		educatorName: "Miriam Lee", 
		educatorPrice: "29", 
		educatorImage: "https://static.pexels.com/photos/7720/night-animal-dog-pet.jpg",
		educatorDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		educatorName: "Jonas Soriano", 
		educatorPrice: "20", 
		educatorImage: "http://is1.mzstatic.com/image/thumb/Purple117/v4/83/3b/5f/833b5fdc-02c2-e0b3-8fb3-7326af4e8cc5/source/1200x630bb.jpg",
		educatorDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		educatorName: "Timothy Choh", 
		educatorPrice: "19", 
		educatorImage: "https://scontent.ford1-1.fna.fbcdn.net/v/t1.0-9/18921716_10155380079982248_2306725261566143020_n.jpg?oh=304e5dce71878c9fc709977da602dfb8&oe=5A07BBC1",
		educatorDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
];

function seedDb() {
	// remove all educators
	Educator.remove({}, function (err) {
		if(err) {
			console.log(err);
		} 
		Comment.remove({}, function (err) {
			if(err){
				console.log(err);
			}
			console.log("removed all data from educator and comment collections")
			// add a few educator profiles
			data.forEach(function (seed) {
				Educator.create(seed, function (err, educator) {
					if(err){
						console.log(err);
					} else {
						console.log("added an educator profile");
						// create a comment
						Comment.create( // Comment is instantiated comment model exported from ./models/comments.js
							{
								commentText: "You are the best tutor ever!",
								commentAuthor: "Plato",
							}, function (err, comment) {
								if(err){
									console.log(err);
								} else {
									educator.educatorComments.push(comment);
									educator.save();
									console.log("created a new comment");
								}
						});
					}
				});
			});
		});
	});
};

module.exports = seedDb;
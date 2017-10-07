var mongoose = require("mongoose");

// SCHEMA SETUP FOR EDUCATOR PROFILES
var educatorSchema = new mongoose.Schema({
	educatorName: {type: String, required: true},
	educatorPrice: {type: String, required: true},
	educatorImage: String,
	educatorDescription: {type: String, required: true},
	educatorAuthor: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	educatorComments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment", // name refers and needs to match DB class name
		}
	],
});

// Set up model class in DB with schema and instantiate in var to export
// MongoDB will change name to lowercase and add plural at end
var Educator = mongoose.model("Educator", educatorSchema); 

module.exports = Educator
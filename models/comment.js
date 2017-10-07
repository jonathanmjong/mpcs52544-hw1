var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
	commentText: {type: String, required: true},
	commentAuthor: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

// Set up model class in DB with schema and instantiate in var to export
// MongoDB will change name to lowercase and add plural at end
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
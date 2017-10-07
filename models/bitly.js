var mongoose = require("mongoose");

var BitlySchema = new mongoose.Schema({
    bitly_link: {type: String, required: true},
    redirect_link: {type: String, required: true},
    num_views: {type: Number, default: 0},
    last_viewed: Date
});

// BitlySchema.pre('save', function (next) {
//     var Bitly = this;

//     Bitly.last_viewed = new Date();
//     Bitly.num_views = Bitly.num_views + 1;
// });

module.exports = mongoose.model("Bitly", BitlySchema);
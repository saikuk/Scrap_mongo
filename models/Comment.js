var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    title: String,

    body: String

});

// Creates the model using above Schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
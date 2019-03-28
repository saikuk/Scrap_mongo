// Require mongoose
var mongoose = require("mongoose");
var Note = require("./Comment");
// Create Schema class
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  headline: {
      type: String,
      required: true
  },
  summary: {
      type: String,
      required:true
  },
  link: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  },
  comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
  }

});


// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
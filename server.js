var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");
var PORT = 4000;

var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));



mongoose.connect("mongodb://heroku_nfp7rl4g:LmsCk4FRvCfdEq3@ds147274.mlab.com:47274/heroku_nfp7rl4g", { useNewUrlParser: true });



app.get("/scrape", function (req, res) {

  axios.get("https://www.npr.org/tags/170838685/book-news").then(function (response) {

    var $ = cheerio.load(response.data);

    $("article.item").each(function (i, element) {

      var result = {};

      result.headline = $(this)
        .children("div.item-info-wrap")
        .children("div.item-info")
        .children("h2.title")
        .text();

      result.link = $(this)
        .children("div.item-info-wrap")
        .children("div.item-info")
        .children("h2.title")
        .children("a")
        .attr("href");

      result.summary = $(this)
        .children("div.item-info-wrap")
        .children("div.item-info")
        .children("p.teaser")
        .text();

      result.image = $(this)
        .children("div.item-image")
        .children("div.imagewrap")
        .children("a")
        .children("img")
        .attr("src");

      db.Article.create(result)

        .then(function (dbArticle) {
          console.log(dbArticle);
        })

        // Catch error
        .catch(function (err) {
          console.log("++ DB Article Create Error ++\n" + err)
        });
    });
    res.send("Scrape Complete!");
  });
});

app.get("/articles", function (req, res) {

  db.Article.find({})

    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/articles/:id", function (req, res) {

  db.Article.findOne({ _id: req.params.id })

    .populate("comment")
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {

  // Create a new Comment and pass the req.body to the entry
  db.Comment.create(req.body)

    .then(function (dbComment) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
$.getJSON("/articles", function(data) {

  for (let i = 0; i < data.length; i++) {

      // Add information to client with appropriate data tags
      console.log(data[i]);
      $("#articles").append
          ("<div class='entry container' data-id='" 
          + data[i]._id 
          + "'> <a class='link col s3' href'"
          + data[i].link 
          + "<img class='entry-image' src='"           
          + data[i].image 
          + "'></a> <div class='entry-info col s9'> <h2 class='headline'>" 
          + data[i].headline 
          + "</h4> <p class='summary'>" 
          + data[i].summary
          + "</p></div></div>");
  }
});
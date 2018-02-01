
// Creates initial array of animals.
var animals = ["Cat", "Dog", "Horse", "Hamster"];

// displayAnimalInfo function re-renders the HTML to display the appropriate content.
function displayAnimalInfo() {
  // Deletes the images prior to adding new images.
  $("#animals-view").empty();

  var animal = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=cRJcC3cUgepwCr7h0LWKrpVX8bfYG9JD&limit=10";
  
  // Creates an AJAX call for the clicked animal button.
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      // Creates a variable for the response data.
      var result = response.data;
      
      // Loops through the response data to determine the ratings and
      // images to display. 
      for (var i = 0; i < result.length; i++) {
          // Creates a div to hold each animal object.
          var animalDiv = $("<div class='animal'>");
          // Creates an element to hold the image.
          var image = $("<img>");
          // Stores the rating data.
          var rating = result[i].rating;
          // Creates an element to have the rating displayed.
          var myRating = $("<p>").text("Rating: " + rating);
          // Displaying the rating.
          animalDiv.append(myRating);
          // Retrieves the URL for the still image.
          var imgURL = result[i].images.fixed_height_still.url;
          // Assigns the still attribute URL to the image.
          image.attr("data-still", imgURL);
          // Revtrieves the URL for the animated image.
          var imgGif = result[i].images.fixed_height.url;
          // Assigns the animated attribute URL to the image.
          image.attr("data-animate", imgGif);
          // Assigns the source attribute to URL the image. 
          image.attr("src", imgURL);
          // Assings the default state attribute to the image.
          image.attr("data-state" , "still");
          // Appends the image.
          animalDiv.append(image);
          // Puts the animal before the previous animals.
          $("#animals-view").prepend(animalDiv);
      }
    
  });
}

// Function for displaying animal images.
function renderButtons() {

  // Deletes the buttons prior to adding new buttons.
  $("#buttons-view").empty();

  // Loops through the array of animals.
  for (var i = 0; i < animals.length; i++) {

    // Dynamicaly generates buttons for each animal in the array.
    var myButton = $("<button>");
    // Adds a class of animal-btn to the button.
    myButton.addClass("animal-btn");
    // Adds a data-attribute.
    myButton.attr("data-name", animals[i]);
    // Provides the initial button text.
    myButton.text(animals[i]);
    // Adds the button to the buttons-view div.
    $("#buttons-view").append(myButton);
  }
}

// Handles events when an animal button is clicked.
$("#add-animal").on("click", function(event) {
   event.preventDefault();
   // Gets the input from the textbox.
   var animal = $("#animal-input").val().trim();
   // Adds animal from the textbox to the array.
   animals.push(animal);
   // Calls renderButtons to display the buttons.
   renderButtons();
});

// Adds a click event listener to for elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calls the renderButtons function to display the intial buttons.
renderButtons();

// Adds a click event listener for the image elements.    
$(document).on("click","img", function() {
  // Creates the state variable with the state attribute value for 
  // the image that was clicked.
  var state = $(this).attr("data-state");
  // If the clicked image state is still, updates its src attribute to its data-animate value, and sets the image data-state to animate. Otherwise, sets its src attribute to the data-still value, and sets the image data-state to still.
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
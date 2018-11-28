$("#location").hide();
$("#main-inputs").hide();
$("#results").hide();

$("#age-submit").on("click", function (e) {
    e.preventDefault();
    // if userAge > 21 verify user


    // hide the age input and show the location input
    $("#header").hide();
    $("#location").show();

    // if the age is < 21 alert the user and do nothing
})

var cuisineInput = 'Vietnamese';
// Variables required to build ajax query URLs      
var cuisineId;
console.log('cuisine ID-1 : ' + cuisineId)
var radiusMeters = 25000;
var apiKey = '7fd9b4ff24a0fa2eae39b02482c2e9b1';
var urlOne = 'https://developers.zomato.com/api/v2.1/cuisines?';
var urlTwo = 'https://developers.zomato.com/api/v2.1/search?';
var urlLat = 'lat=' + latitude;
var urlLon = '&lon=' + longitude;
var urlRadius = '&radius=' + radiusMeters;
var urlCuisine = '&cuisines=' + cuisineId;
var restaurantsArray = [];
var cuisineUrl = urlOne + urlLat + urlLon


// Lat and lon coordinates that need google.maps data
var longitude = -117.1831509;
var latitude = 32.8530525;
$("#location-submit").on("click", function (e) {
    e.preventDefault();
    alert('click');

    // gather user input
    // var cuisineInput = $('#cuisine').val().trim();
    // console.log(cuisineInput);

    // reference user input against APIs
    // Ajax call to gather cuisine object for the lat/long coordinates
    $.ajax({
        url: cuisineUrl,
        method: "GET",
        headers: {
            "user-key": apiKey
        }
    }).then(function (responseOne) {
        console.log(responseOne);
        console.log(responseOne.cuisines.length);
        console.log((responseOne.cuisines[0].cuisine.cuisine_name).toLowerCase());



        for (var i = 0; i < responseOne.cuisines.length; i++) {
            if ((responseOne.cuisines[i].cuisine.cuisine_name).toLowerCase() === (cuisineInput).toLocaleLowerCase()) {
                cuisineId = responseOne.cuisines[i].cuisine.cuisine_id;
                console.log('cuisineID: ' + cuisineId);
                break;
            }
            // else {
            //     alert('Cuisine not found');
            // }
        }

    });

    // move to next screen
    $("#location").hide();
    $("#main-inputs").show();
})

$("#back-button-1").on("click", function (e) {
    e.preventDefault();


    $("#location").show();
    $("#main-inputs").hide();
})



// ajax call to gather eatery data
var queryURL = urlTwo + urlLat + urlLon + urlRadius + urlCuisine;
console.log(queryURL);

$.ajax({
    url: queryURL,
    method: "GET",
    headers: {
        "user-key": apiKey
    }
}).then(function (responseTwo) {
    console.log(responseTwo);
    for (var i = 0; i < responseTwo.restaurants.length; i++) {
        restaurantsArray.push(responseTwo.restaurants[i].restaurant.name);
    }
    console.log(restaurantsArray);
});




$( "#5-day" ).hide();
 
$(document).ready(function () {

 
 
 if ("geolocation" in navigator) {
    //check geolocation available
    //try to get user current location using getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(
        "Found your location \nLat : " +
          position.coords.latitude +
          " \nLang :" +
          position.coords.longitude
      );
    });
  } else {
    // console.log("Browser doesn't support geolocation!");
  }

  //submit button
  $("#submit").click(function (event) {
    var userCity = $("#search-city").val().trim();

    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=045f01a53bdb9c81d396467bc99a5685`;

    $("#display").empty();

    console.log(queryURL);
    //ajax call
    $.ajax({
      url: queryURL,

      method: "GET",
    }).then(function (response) {
      var cities = [];

      var momentNow = moment();

      var tempF = parseInt((response.main.temp - 273.15) * 1.8 + 32);

      console.log(tempF);

      $("#display").append(
        response.name + momentNow.format(" MMMM DD YYYY ") + "<br>"
      );

      $("#display").append("Temperature = " + tempF + "F" + "<br>");
      // console.log(response);

      $("#display").append(
        "Humidity = " + response.main.humidity + "%" + "<br>"
      );

      $("#display").append(
        "Wind speed = " + response.wind.speed + "MPH" + "<br>"
      );

      $("#display").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );

      cities.push(userCity);

      localStorage.setItem(cities, JSON.stringify(userCity));

      $("#search-history").append("<li>" + cities[0] + "</li>");
    });



     
  
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=045f01a53bdb9c81d396467bc99a5685`,

      method: "GET",
    }).then(function (response) {
 
      $( "#5-day" ).show( "slow", function() {
  
      $("#mon").empty();
      $("#tues").empty();
      $("#wed").empty();
      $("#thurs").empty();
      $("#fri").empty();
      
          
      console.log(response);
      var forecast1temp = parseInt(
        (response.list[4].main.feels_like - 273.15) * 1.8 + 32
      );
      var forecast1date = response.list[4].dt_txt;
      var forecast1hum = response.list[4].main.humidity;
      $("#mon").append(" Date : " + forecast1date + " PM" + "<br>");
      $("#mon").append(" Temperature : " + forecast1temp + " F" + "<br>");
      $("#mon").append(" Humidity : " + forecast1hum + " %" + "<br>");
      $("#mon").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.list[4].weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );

      var forecast2temp = parseInt(
        (response.list[12].main.feels_like - 273.15) * 1.8 + 32
      );
      var forecast2date = response.list[12].dt_txt;
      var forecast2hum = response.list[12].main.humidity;
      $("#tues").append(" Date : " + forecast2date + " PM" + "<br>");
      $("#tues").append(" Temperature : " + forecast2temp + " F" + "<br>");
      $("#tues").append(" Humidity : " + forecast2hum + " %" + "<br>");

      $("#tues").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.list[12].weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );

      var forecast3temp = parseInt(
        (response.list[20].main.feels_like - 273.15) * 1.8 + 32
      );
      var forecast3date = response.list[20].dt_txt;
      var forecast3hum = response.list[20].main.humidity;
      $("#wed").append(" Date : " + forecast3date + " PM" + "<br>");
      $("#wed").append(" Temperature : " + forecast3temp + " F" + "<br>");
      $("#wed").append(" Humidity : " + forecast3hum + " %" + "<br>");

      
      $("#wed").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.list[20].weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );
      
      var forecast4temp = parseInt(
        (response.list[28].main.feels_like - 273.15) * 1.8 + 32
      );
      var forecast4date = response.list[28].dt_txt;
      var forecast4hum = response.list[28].main.humidity;
      $("#thurs").append(" Date : " + forecast4date + " PM" + "<br>");
      $("#thurs").append(" Temperature : " + forecast4temp + " F" + "<br>");
      $("#thurs").append(" Humidity : " + forecast4hum + " %" + "<br>");

      
      $("#thurs").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.list[28].weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );

      var forecast5temp = parseInt(
        (response.list[36].main.feels_like - 273.15) * 1.8 + 32
      );
      var forecast5date = response.list[36].dt_txt;
      var forecast5hum = response.list[36].main.humidity;
      $("#fri").append(" Date : " + forecast5date + " PM" + "<br>");
      $("#fri").append(" Temperature : " + forecast5temp + " F" + "<br>");
      $("#fri").append(" Humidity : " + forecast5hum + " %" + "<br>" );

        
      $("#fri").append(
        "<img src='http://openweathermap.org/img/w/" +
          response.list[36].weather[0].icon +
          ".png' alt='Icon depicting current weather.'>"
      );
    
    });
   

  var cityLat = response.city.coord.lat;
  
  
  var cityLon = response.city.coord.lon;

     

      $.ajax({
        url:`http://api.openweathermap.org/data/2.5/uvi?appid=045f01a53bdb9c81d396467bc99a5685&lat=${cityLat}&lon=${cityLon}`,
      
      
        method:"GET"
      }).then(function(response){

        console.log(response)

        $("#uvi-dis").html("UVI :" + response.value)

        
            
       
        
        if(response.value  < 8 ){
          $("#uvi-dis").css('background-color', 'yellow')
        }
        

        if(response.value  > 8 ){
          $("#uvi-dis").css('background-color', 'red')
        }


            
        if(response.value  < 6 ){
          $("#uvi-dis").css('background-color', 'green')
        }


      


      })
});
   

  

    event.preventDefault();
  });
});

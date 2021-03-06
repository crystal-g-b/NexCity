// let listLocation = document.querySelector(".") //need to fill this in with a class where we are throwing the list for the html

// static inputs for Tokyo
let endCity = "Tokyo"; // later input used in case we are switching cities or building out the end point
let endCitySymbol = "TYOA";
let travelId = "298184";

// inputs for the city
let citySymbol = "";
let cityName = "New York";

// user inputs budgets and nights/people
// let budget = 4000;
let adultsNum = 3;
let roomNum = 2;
// let flightPrice = "";
// let startDate = "2021-05-15"; //if you are going to test dates remember to have them in the future
// let returnDate = "2021-05-20";
let nights = "1";
let lat = 35.6762;
let long = 139.6503;

const getFlights = document.querySelector("#get-flights");

const saveFlights = document.querySelector(".save-flight")
const resultFlight = document.querySelector(".results")



// final input
function test1(event) {
  event.preventDefault();

  startDate = document.querySelector("#start").value.trim();
  returnDate = document.querySelector("#return").value.trim();
  cityName = document.querySelector("#location").value.trim();
  budget = document.querySelector("#budget").value.trim();
  adultsNum = document.querySelector("#people").value.trim();
  roomNum = document.querySelector("#rooms").value.trim();

  if (
    !startDate ||
    !returnDate ||
    !cityName ||
    !budget ||
    !adultsNum ||
    !roomNum
  ) {
    alert("please remember to input all info");
    return;
  } else {
    addResultsSection();
  }
}

function removeform() {
  let form1 = document.querySelector("#inputs1");
  form1.remove();
}

function addResultsSection() {
  let resultsSection;
}

// skyscanner api
// request for the city code
function gettingTheCityCode() {
  const skyscannerCityName = {
    method: "GET",
    url: "/api/destination/cities/" + cityName,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .request(skyscannerCityName)
    .then(function (response) {
      console.log(response.data.Places[0].CityId);
      citySymbol = response.data.Places[0].CityId;
      gettingFlightData(citySymbol);
    })

    .catch(function (error) {
      console.error(error);
    });
}

function gettingFlightData() {
  let flightoptions = {
    method: "GET",
    url: "api/destination/flights",
    params:{
      citySymbol: citySymbol,
      endCity: endCitySymbol,
      startDate: startDate,
      returnDate: returnDate  
    },
    // we can send a post request (bad practice)
    // query string
    // ?symbol=SYM&endSymbol=END&startDate=whatever&returnDate=anotherDate
    // req.query.symbol = SYM
    // req.query.endSymbol = END
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
    .request(flightoptions)
    .then(function (response) {
      // console.log(response.data.Carriers[0].Name);
      // data.quotes & data.carriers
      generateFlightList(response)
    })
    .catch(function (error) {
      console.error(error);
    });
}

function generateFlightList(response) {
  // flightPrice = response.data.Quotes[1].minPrice; //this is added to show what the lowest price option is in the list
  console.log(response.data.Carriers[0].Name)
  for (let i = 0; i <= response.data.Quotes.length; i++) {
    // generate the list from the options given
    // try to give no more than 10 options
    let flightCells = 
  `
  <div class="card-body results" data-marker='${i}'>
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">Carrier: <span data-marker='${i}' id="carrier${i}" >Sample Tokyo Airways</span></p>
                            <p class="card-text">Airport: <span data-marker='${i}' id="airport${i}">Sample Airport</span></p>
                            <p class="card-text">Min Price: $<span data-marker='${i}' id="price${i}">Lowest Price Flight @ 1 BitCoin</span></p>
                            <button class="save-flight btn btn-primary" id='${i}' onClick='btnID(this.id)'>Save Flight</button>
  `
  resultSect.innerHTML= flightCells
  }
}

// <div>
//       <div class='results' data-marker='${i}' >
//           <p>Carrier: <span data-marker='${i}' id="carrier${i}" >${response.data.Carriers[i].Name}</span></p>
//           <p>Airport: <span data-marker='${i}' id="airport${i}">${response.data.Places[i].IataCode}</span></p>
//           <p>Min Price: $<span data-marker='${i} id="price${i}"'>${response.data.Quotes[i].MinPrice}</span></p>
//           <div>
//               <button class="save-flight" id='${i}' onClick='btnID(this.id)'>save</button>
//           </div>
//       </div>

function btnID(ID) {
  // push the flight to trip array
  console.log(ID)
  let flight =[]
  if ( resultFlight.dataset.marker === ID ){
    let carrrier = document.querySelector(`carrier${ID}`).value;
    let airport = document.querySelector(`airport${ID}`).value;
    let price = document.querySelector(`price${ID}`).value;
    flight.push(carrrier)
    flight.push(airport)
    flight.push(price)
  }
  console.log(flight)
}
// travel advisor api
function dateDifference() {
  let date1 = new Date(startDate);
  let date2 = new Date(returnDate);
  let dateDifference = date2.getTime() - date1.getTime();
  nights = dateDifference / (1000 * 3600 * 24);
  gettingHotel();
}
function gettingHotel() {
  const options = {
    method: "GET",
    url: "/hotel" + travelId + adultsNum + roomNum + nights,
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      let hotelList = response.data.data; //don't ask why this is the way that it is
      lat = respone.data.data.latitude;
      long = respone.data.data.latitude;
      createHotelOptions(hotelList);
    })
    .catch(function (error) {
      console.error(error);
    });
}
function createHotelOptions(hotelList) {
  // creating the list for the user to use from
  for (let i = 0; i <= hotelList.length; i++) {
    // going to pull
    hotelList[i].photo.images[1];
    hotelList[i].name;
    hotelList[i].reviews;
    hotelList[i].price;

    // add a button that is going to save the hotel to the list
  }
}
function saveHotel() {
  // this function is going to save the lat and long from the selected object
  // push all the data needed to the database // this is the function that is needed to get the resturants that are near the hotel
  // this is the function that is needed to get the attractions that are near the hotel
}
// save the hotel function, going to need the number of days to generated cost
// from there we are going to need to have the budget adjusted
// this function is going to save the lat and longitude of the selected hotel
// getting resturants near the hotel
function restLatLong() {
  const options = {
    method: "GET",
    url: "h/resturants/" + lat + long,
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      createRestOptions(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}
function createRestOptions(response) {}
function saveRest() {
  //using the button to save the rest options
}
// getting attractions near the hotel
function attrractLatLong() {
  const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
    params: {
      longitude: lat,
      latitude: long,
      lunit: "mi",
      currency: "USD",
      limit: "15",
      distance: "10",
      lang: "en_US",
    },
    headers: {
      "x-rapidapi-key": process.env.API,
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      createAttractOptions(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}
function createAttractOptions(response) {}
function saveAttract() {
  //using the button to save the Attract
}
function budgetAdjust(input) {
  // taking the input after every save function to then take the price and subject that from the total budget
  if (budget < 0) {
    //change the colour of budget to red if it is lower than 0
  }
}
function postToUser() {
  // this is going to be for the post method for the user on the database
  // Quotes = budget
  // hotel = destination
  // carriers = airlines/ date
  // attractions = places to see near by
}

// function calls
// gettingTheCityCode();
// dateDifference();

// buttons that need to be created                              Functions for each event

// 
// saveFlight.addEventListener("click", saveFlight);
// button to save the flight generated from the list        saveFlight
// button to save the hotel and the lat/long to a global    saveHotel
// button that is going to save the resturants              saveRest
// button that is going to save the attractions             saveAttract

// button to get the flights                                gettingTheCityCode
// button to get the hotels                                 dateDifference ---> gettingHotel
// button that is going to bring up the attractions         attrractLatLong
// button that is going to bring up the resturants          restLatLong

// will be adding the event listener for the gettingTheCityCode after the user wants to save the data

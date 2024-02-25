auth0.createAuth0Client({
  domain: "dev-6af1rhk16075mjiz.us.auth0.com",
  clientId: "ETEkszSpLvx32uEbCXy6ENPev09ekB3z",
  authorizationParams: {
    redirect_uri: "https://ethantiller.github.io/Stock-O-Clock/mainpage.html"
  }
}).then(async (auth0Client) => {
  // Assumes a button with id "getstartedBtn" in the DOM
  const loginButton = document.getElementById("getstartedBtn");

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });
  
  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Assumes a button with id "logout" in the DOM
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout();
  });

console.log("Right here")
  const isAuthenticated = await auth0Client.isAuthenticated();
  const userProfile = await auth0Client.getUser();

  // Assumes an element with id "profile" in the DOM
 

});




window.onload = function() {
  document.querySelector("#submitBtn").addEventListener("click",(e)=>{
    e.preventDefault()

    const companySymbol = document.querySelector("#searchBtn").value
    

    // Check if an element with the same id already exists
    let existingElement = document.getElementById(companySymbol);
    if (existingElement) {
      console.log(`Data for symbol: ${companySymbol} already exists`); // Log a message if data for the symbol already exists
      return; // Exit the function
    }

    fetch("https://financialmodelingprep.com/api/v3/symbol/NASDAQ?apikey=28d2f4dffc28a60921b7ada9e9d829e0")
    .then(response => {
      if(!response.ok){
          throw new Error("Could not fetch resource")
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log the returned data
      let found = false;  
      for (let i = 0; i < data.length; i++) {
        if (data[i].symbol === companySymbol) {
          let newElement = document.createElement('div');
          newElement.className = companySymbol
          newElement.id = companySymbol; // Set the id of the element to the company symbol
          newElement.innerHTML = `
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Name: ${data[i].name}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Current Price: ${data[i].price}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Stock Exchange: ${data[i].exchange}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Year High: ${data[i].yearHigh}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Year Low: ${data[i].yearLow}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Day High: ${data[i].dayHigh}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Day Low: ${data[i].dayLow}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Volume: ${data[i].volume}|</p>
            <p style="display: inline-block; border: none; font-size: 16px; font-weight: bold;">Opening: ${data[i].open}|</p>`;
          document.querySelector(".stock-stats").appendChild(newElement);
          found = true;
          break;
        }
      }
      if (!found) {
        console.log(`No data found for symbol: ${companySymbol}`); // Log a message if no matching symbol was found
      }
    })
    .catch(error => console.error(error));
  })

  document.querySelector("#deleteBtn").addEventListener("click",(e)=>{
    e.preventDefault()

    // Get the company symbol from the search input instead of the delete input
    const companySymbol = document.querySelector("#searchBtn").value
    let element = document.getElementById(companySymbol);

    if (element) {
      element.remove(); // Remove the element with the id equal to the company symbol
    } else {
      console.log(`No element found with symbol: ${companySymbol}`); // Log a message if no element was found
    }
  })
}

$(document).ready(function() {
  // Initially hide the stock logo, inputs, and buttons
  $('#stoc-logo-main').hide();
  $('#searchBtn').hide();
  $('#submitBtn').hide();
  $('#deleteBtn').hide();
  $('#stocky-main').hide();

  // When the "start searching now" button is clicked
  $('#getstartedmain').click(function() {
    // Fade out the "start searching now" button
    $(this).fadeOut('slow');
    $('#stocky-red').fadeOut('slow');
    $('#stocky-green').fadeOut('slow', function() {

      // After the button has faded out, fade in the stock logo, inputs, and buttons
    $('#stoc-logo-main').fadeIn('slow');
    $('#searchBtn').fadeIn('slow');
    $('#submitBtn').fadeIn('slow');
    $('#deleteBtn').fadeIn('slow');
    $('#stocky-main').fadeIn('slow');
    });
  });
});


/*
function getRecords() {
    var userID =  userProfile.user_id
    var body = {
      app: 2
    };
  
    // Kintone REST API Request calling the Kintone Get Record API
    kintone.api(kintone.api.url('/k/v1/record.json', true), 'GET', body, function(success) {
      // The function called on success
      var records = success.records;
      var recordSize = records.length + 1;
      window.alert('There are now currently ' + recordSize + ' records in this App.');
    }, function(error) {
      // The function called on error

      var errormsg = 'Unable to retrieve user preferences. Loading default view.';
      window.alert(errormsg);
    });
  }
  
  kintone.events.on('app.record.create.submit', getRecords);

  console.log(records)
  */
// fetch all the info about the countries
let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

let darkModeOn = false;
document.getElementById("country").style.display = "none";
let countryNames = new Map();
//create div with text fot all the countries
//asyncronous function, awaits the data to be returned and then the function goes forward
async function getAll() {
  let data = await response;
  //documentfragment creates a virtual document
  let fragment = new DocumentFragment();
  //forEach loops through every element of the document and creates a div element with img and empty paragraph inside it for each element
  data.forEach((element) => {
    let card = document.createElement("div");
    let flag = document.createElement("img");
    let name = document.createElement("h2");
    let population = document.createElement("p");
    let region = document.createElement("p");
    let capital = document.createElement("p");

    //Set id for the country container (div)
    card.setAttribute("id", element.name.common.toLowerCase());
    //data-parent stores informations inside an element (something like id or class) that can be called afterwards for the styling
    population.setAttribute("data-parent", "population");
    region.setAttribute("data-parent", "region");
    capital.setAttribute("data-parent", "capital");
    //adds a class to the card div and we call it like the name of the region of the country and set it to lower case
    card.classList.add("card-div", element.region.toLowerCase(), "light");

    //give the click event to every card so when we click on the country a command will be executed
    card.addEventListener("click", function () {
      document.getElementById("country-div").style.display = "none";
      document.getElementById("country").style.display = "block";
      document.getElementById("search-filter").style.display = "none";
      // get the values of the first Object because of the index [0]
      let nativeNames = Object.values(element.name.nativeName)[0];
      //get all the values of the object
      let theLanguages = Object.values(element.languages);
      let theCurrencies = Object.values(element.currencies);

      //get informations about the country and assign  text and image instead of using html we get the information from the browser
      document.getElementById("native-name").innerText = nativeNames.common;
      document.getElementById("flag").src = element.flags.png;
      document.getElementById("name").innerText = element.name.common;
      document.getElementById("population").innerText = new Intl.NumberFormat(
        "ja-JP"
      ).format(element.population);
      document.getElementById("region").innerText = element.region;
      document.getElementById("subregion").innerText = element.subregion;
      document.getElementById("capital").innerText = element.capital;
      document.getElementById("top-level-domain").innerText =
        element.tld.join(", ");
      document.getElementById("languages").innerText = theLanguages.join(", ");
      document.getElementById("currencies").innerText = theCurrencies
        .map((currency) => currency.name)
        .join(", ");

      //remove old buttons if any
      let borderButtons = document.getElementById("borderButtons");

      //removes all the buttons of the border countries inside the element by giving it an empty string so it can be resetted for the new border countries
      borderButtons.textContent = "";

      //create border country buttons
      // element is part of the JSON document of the specific country
      // it checks IF the string "border" is inside that element and if so it creates the h3 and gives it the name of "Border Countries"
      //then it assigns it to the borderButtons div and
      //for each element it calls the function to create buttons
      if ("borders" in element) {
        let h3Text = document.createElement("h3");
        h3Text.innerText = "Border Countries:";
        h3Text.style.fontWeight = "600";
        if (darkModeOn) {
          h3Text.style.color = "white";
        } else {
          h3Text.style.color = "black";
        }

        document.getElementById("borderButtons").appendChild(h3Text);
        // borders lists all border countries in cca3 format
        // cca3 is three letter addreviation of a country
        element.borders.forEach(makeButtons);
      }
      //this function creates one button for every country
      function makeButtons(countryShort) {
        let b = document.createElement("button");
        if (darkModeOn) {
          b.className = "dark";
        } else {
          b.className = "light";
        }
        let currentCountry = countryNames.get(countryShort);
        b.innerText = currentCountry;
        b.onclick = function () {
          document.getElementById(currentCountry.toLowerCase()).click();
        };
        document.getElementById("borderButtons").appendChild(b);
      }
    });

    name.textContent = element.name.common;
    flag.src = element.flags.png;
    population.textContent = new Intl.NumberFormat("ja-JP").format(
      element.population
    );
    region.textContent = element.region;
    capital.textContent = element.capital;
    card.append(flag, name, population, region, capital);
    countryNames.set(element.cca3, element.name.common);

    fragment.appendChild(card);
  });
  document.getElementById("country-div").appendChild(fragment);
}
getAll();

// code for the search bar
let searchBar = document.getElementById("search-bar");
let cards = document.getElementsByClassName("card-div");
let region = "";

let searchInput = function () {
  for (let i = 0; i < cards.length; i++) {
    //if statement in form of A && (B||C)
    //displayed countries need to match the search bar input
    //also region needs to match the region variable
    if (
      cards[i].id.includes(searchBar.value) &&
      (region === "" || cards[i].classList.contains(region))
    ) {
      cards[i].style.display = "block";
    } else {
      //if if-statement fails we don't display card
      cards[i].style.display = "none";
    }
  }
};
searchBar.addEventListener("input", searchInput);
document
  .querySelectorAll("button")
  .forEach((element) => element.classList.add("light"));

// code for the select filter bar
async function filter() {
  //set region to value of the filter select bar

  //search input can be cleared with code below:
  // document.getElementById("search-bar").value = "";
  region = document.getElementById("filter-select").value.toLowerCase();
  //because complex if check in seachInput(), it can be used also for filter functionality
  searchInput();
}

//just a go-back button
function goBack() {
  document.getElementById("country-div").style.display = "flex";
  document.getElementById("country").style.display = "none";
  document.getElementById("search-filter").style.display = "flex";
}

function darkMode() {
  if (!darkModeOn) {
    console.log("asd");
    document
      .querySelectorAll(".light")
      .forEach((element) => element.classList.add("dark"));
    document
      .querySelectorAll(".light")
      .forEach((element) => element.classList.remove("light"));
    document
      .querySelectorAll("p")
      .forEach((element) => (element.style.color = "white"));
    document
      .querySelectorAll("h2")
      .forEach((element) => (element.style.color = "white"));
    document
      .querySelectorAll("h3")
      .forEach((element) => (element.style.color = "white"));
    document.getElementById("country-div").style.backgroundColor =
      "hsl(207, 26%, 17%)";
    document.getElementById("search-filter").style.backgroundColor =
      "hsl(207, 26%, 17%)";
    document.getElementById("country").style.backgroundColor =
      "hsl(207, 26%, 17%)";
    document.body.style.backgroundColor = "hsl(207, 26%, 17%)";

    darkModeOn = true;
  } else {
    document
      .querySelectorAll(".dark")
      .forEach((element) => element.classList.add("light"));
    document
      .querySelectorAll(".dark")
      .forEach((element) => element.classList.remove("dark"));
    document
      .querySelectorAll("p")
      .forEach((element) => (element.style.color = "black"));
    document
      .querySelectorAll("h2")
      .forEach((element) => (element.style.color = "black"));
    document
      .querySelectorAll("h3")
      .forEach((element) => (element.style.color = "black"));
    document.getElementById("country-div").style.backgroundColor =
      "hsl(0, 0%, 98%)";
    document.getElementById("search-filter").style.backgroundColor =
      "hsl(0, 0%, 98%)";
    document.getElementById("country").style.backgroundColor =
      "hsl(0, 0%, 98%)";
    document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
    darkModeOn = false;
  }
}

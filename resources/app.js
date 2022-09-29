// fetch all the info about the countries
let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

document.getElementById("country").style.display = "none";
let countryNames = new Map();
//create div with text fot all the countries
async function getAll() {
  let data = await response;
  let fragment = new DocumentFragment();
  data.forEach((element) => {
    let card = document.createElement("div");
    let flag = document.createElement("img");
    let name = document.createElement("h2");
    let population = document.createElement("p");
    let region = document.createElement("p");
    let capital = document.createElement("p");

    card.setAttribute("id", element.name.common.toLowerCase());
    card.classList.add("card-div", element.region.toLowerCase());
    function filterBypass(asd) {
      return true;
    }
    //give the click event to every card
    card.addEventListener("click", function () {
      document.getElementById("country-div").style.display = "none";
      document.getElementById("country").style.display = "block";
      // document.getElementById("native-name").innerText =
      // keys = Object.keys(element.name.nativeName);
      // console.log(keys);
      // let a;
      // keys.forEach((c) => {
      //   a = c;
      // });
      // console.log(a);
      // document.getElementById("native-name").innerText =
      //   element.name.nativeName.a.common;
      document.getElementById("flag").src = element.flags.png;
      document.getElementById("name").innerText = element.name.common;
      document.getElementById("population").innerText = element.population;
      document.getElementById("region").innerText = element.region;
      document.getElementById("subregion").innerText = element.subregion;
      document.getElementById("capital").innerText = element.capital;
      document.getElementById("top-level-domain").innerText = element.tld;
      // console.log(element.languages.fil);
      // document.getElementById("languages").innerText = element.languages;
      // console.log(element.currencies.BND.symbol);
      // document.getElementById("currencies").innerText =
      //   element.currencies.BND.symbol;

      // console.log(element.nativeName.filter(true).common);

      //remove old buttons if any
      let borderButtons = document.getElementById("borderButtons");
      while (borderButtons.hasChildNodes()) {
        borderButtons.removeChild(borderButtons.lastChild);
      }

      //create border country buttons
      if ("borders" in element) {
        element.borders.forEach(makeButtons);
      }
      function makeButtons(countryShort) {
        let b = document.createElement("button");
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
    population.textContent = "Population: " + element.population;
    region.textContent = "Region: " + element.region;
    capital.textContent = "Capital: " + element.capital;
    card.append(flag, name, population, region, capital);
    countryNames.set(element.cca3, element.name.common);

    fragment.appendChild(card);
  });
  document.getElementById("country-div").appendChild(fragment);
}
let pageChange = getAll();

// code for the search bar
let searchBar = document.getElementById("search-bar");
let cards = document.getElementsByClassName("card-div");
let region = "";

let searchInput = function () {
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].id.includes(searchBar.value) &&
      (region === "" || cards[i].classList.contains(region))
    ) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }
};

searchBar.addEventListener("input", searchInput);

// code for the select filter bar
async function filter() {
  region = document.getElementById("filter-select").value.toLowerCase();
  searchInput();
}

function goBack() {
  document.getElementById("country-div").style.display = "block";
  document.getElementById("country").style.display = "none";
}

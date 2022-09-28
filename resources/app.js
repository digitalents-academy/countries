// fetch all the info about the countries
let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

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

    //give the click event to every card so we can link it to another html page
    card.addEventListener("click", function () {
      document.getElementById("country-div").style.display = "none";
      // document.getElementById("hh").innerText = "asddas";
      console.log(card.id);
      document.getElementById("hh").innerText = element.name.common;
    });

    name.textContent = element.name.common;
    flag.src = element.flags.png;
    population.textContent = "Population: " + element.population;
    region.textContent = "Region: " + element.region;
    capital.textContent = "Capital: " + element.capital;
    card.append(flag, name, population, region, capital);

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

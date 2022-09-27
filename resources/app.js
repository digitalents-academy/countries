let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    return data;
  });

async function getAll() {
  let data = await response;
  data.forEach((element) => {
    let card = document.createElement("div");
    let flag = document.createElement("img");
    let name = document.createElement("h2");
    let population = document.createElement("p");
    let region = document.createElement("p");
    let capital = document.createElement("p");

    card.setAttribute("id", element.name.common.toLowerCase());
    card.setAttribute("class", "card-div");

    name.textContent = element.name.common;
    flag.src = element.flags.png;
    population.textContent = "Population: " + element.population;
    region.textContent = "Region: " + element.region;
    capital.textContent = "Capital: " + element.capital;
    card.append(flag, name, population, region, capital);

    document.getElementById("country-div").appendChild(card);
  });
}

getAll();

async function filter() {
  let data = await response;
  let selectedValue = document.getElementById("filter-select").value;
  console.log(
    data.filter((region) => region.region.toLowerCase() == selectedValue)
  );
}

// let filter = fetch("https://restcountries.com/v3.1/all")
// .then((res) => res.json())
// .then((data) =>
// data.forEach((element) => {
//   const americas = element.region.filter(word => 'Americas');

// }

//   return '<div>' + '<h2>'</div>'
// ce

//   `<div> ${data}`

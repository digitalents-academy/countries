let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) =>
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
    })
  );

//   return '<div>' + '<h2>'</div>'
// ce

//   `<div> ${data}`

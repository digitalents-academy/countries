let searchBar = document.getElementById("search-bar");

const cards = document.getElementsByClassName("card-div");
const arr = Array.from(cards);
console.log(arr);

searchBar.addEventListener("input", () => {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].id.includes(searchBar.value)) {
      cards[i].style.display = "block";
    } else {
      cards[i].style.display = "none";
    }
  }

  //   arr.forEach((card) => {
  //     if (card.id.includes(searchBar.value)) {
  //       card.style.display = "block";
  //     } else {
  //       card.style.display = "none";
  //     }
  //   });
});

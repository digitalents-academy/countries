let data = [];

let response = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => console.log(data));

const names = data.name.map((x) => console.log(x));

console.log(names);


function myFunction() {
    document.getElementById(“myDropdown”).classList.toggle(“show”);
  }
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches(‘.dropbtn’)) {
      var dropdowns = document.getElementsByClassName(“dropdown-content”);
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains(‘show’)) {
         openDropdown.classList.remove(‘show’);
       }
      }
   }
  }
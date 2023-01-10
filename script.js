window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
console.log(navbar);
var sticky = navbar.offsetTop;
function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
      navbar.classList.remove("top");
      console.log("top removed");
    } else if(window.pageYOffset<sticky) {
        navbar.classList.add("top");
      navbar.classList.remove("sticky");
      console.log("top added");
    }
  }
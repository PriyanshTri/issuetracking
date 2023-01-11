// window.onload = function(){
//     window.onscroll = function() {myFunction()};
// var navbar = document.getElementById("navbar");
// console.log(navbar);
// var sticky = navbar.offsetTop;
// function myFunction() {
//     if (window.pageYOffset >= sticky) {
//       navbar.classList.add("sticky");
//     } else if(window.pageYOffset<sticky) {
//       navbar.classList.remove("sticky");
//     }
//   }
//   if(this.scrollY > 500){
//     $('.scroll-up-btn').addClass("show");
// }else{
//     $('.scroll-up-btn').removeClass("show");
// };
// };
$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        if(this.scrollY>500){
            $('scroll-up-btn').addClass("show");
        }
        else{
            $('scroll-up-btn').removeClass("show");
        }
    });});
     // slide-up script
     $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

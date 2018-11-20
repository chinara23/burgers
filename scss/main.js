const hamburger = document.querySelector(".nav__burger-button");
const fixedMenu = document.querySelector(".burgerclick");


    hamburger.addEventListener('click', function () {
    fixedMenu.classList.toggle('burgerclick__open');
    document.body.classList.toggle('scroll-block');
    hamburger.classList.toggle("nav__burger-button__active");

  });





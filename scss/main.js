const hamburger = document.querySelector(".nav__burger-button");
const fixedMenu = document.querySelector(".burgerclick");
const closeMenu = document.querySelector("nav__burger-button__active");


    hamburger.addEventListener('click', function () {
    fixedMenu.classList.add('burgerclick__open');
    document.body.classList.add('scroll-block');
    hamburger.classList.add("nav__burger-button__active");
    fixedmenu.classList.add("burgerclick_open");

  });

  fixedMenu.addEventListener('click', function () {
    fixedMenu.classList.remove('burgerclick__open');
    document.body.classList.remove('scroll-block');
    
    hamburger.classList.remove("nav__burger-button__active");
    fixedmenu.classList.remove("burgerclick_open");
  });




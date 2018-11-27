////бургер меню////////

const hamburger = document.querySelector(".nav__burger-button");
const fixedMenu = document.querySelector(".burgerclick");


    hamburger.addEventListener('click', function () {
    fixedMenu.classList.toggle('burgerclick__open');
    document.body.classList.toggle('scroll-block');
    hamburger.classList.toggle("nav__burger-button__active");

  });
 

  
 ///////команда//////
      
 function accordeon(btn) {
  $(btn).on("click", function () {
    let thisBtn = this;

    $(btn).each(function (index, element) {
      let accordItem = $(this).parent();

      if (thisBtn == element) {
        if (accordItem.hasClass("team__item--active")) {
          accordItem.removeClass("team__item--active");
        } else {
          accordItem.addClass("team__item--active");
        }
      } else {
        if (accordItem.hasClass("team__item--active")) {
          accordItem.removeClass("team__item--active");
        }
      }
    })
  });
}

accordeon(".team__link");



 ////////отзывы/////////
 function openReviews() {

  const openButton = document.querySelectorAll(".button--btn");
  for (var button of openButton) {

  button.addEventListener('click', function(e) {

      let content = e.target.previousElementSibling.textContent;
      let title = e.target.previousElementSibling.previousElementSibling.textContent;
      if (e.target.classList.contains("button--desctop")) {
         document.body.appendChild(openOverlay(content, title));
      } else {
          content = e.target.previousElementSibling.previousElementSibling.textContent;
          title = e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
          document.body.appendChild(openOverlay(content, title));
      }
    });
  }
}

openReviews()



function openOverlay(content, title) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");
  overlayElement.addEventListener("click", e => {
    if (e.target === overlayElement) {
    closeElement.click();
    }
  });


  const containerElement = document.createElement("div");
  containerElement.classList.add("overlaycontainer");


  const contentElement = document.createElement("div");
  contentElement.classList.add("overlaycontent");
  contentElement.innerHTML = content;


  const titleElement = document.createElement("h3");
  titleElement.classList.add("overlaytitle");
  titleElement.textContent = title;


  const closeElement = document.createElement("a");
  closeElement.classList.add("close");
  closeElement.textContent = "x";
  closeElement.href = "#";
  closeElement.addEventListener("click", function() {
    document.body.removeChild(overlayElement);
  });



  overlayElement.appendChild(containerElement);
  containerElement.appendChild(closeElement);
  containerElement.appendChild(titleElement);
  containerElement.appendChild(contentElement);



  return overlayElement;
};

   


//меню// 
function accordionMenu() {
  const menuItem = document.querySelectorAll(".menu__item");
  const menuAccord = document.querySelector(".menu__list");

  menuAccord.addEventListener("click", event => {
      let target = event.target.parentNode;
      let item = target.parentNode;
      let content = target.nextElementSibling;

      console.log(event.target);

        const listWidth = target.clientWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 480;
        const breakpointPhone = 480;
        const closeMenuWidth = listWidth * menuItem.length;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;

        if (event.target.classList.contains("menu__text")) {
         menus()
      }
      target = event.target;
      item = target.parentNode;
      content = target.nextElementSibling;

      if (target.classList.contains("menu__button")) {
        menus()
    }
    function menus() {

        for (const iterator of menuItem) {
            if (iterator !== item) {
                iterator.classList.remove("menu__item--active");
                iterator.lastElementChild.style.width = 0;
                menuAccord.style.transform = 'translateX(0)';
            }
        }
        if (item.classList.contains("menu__item--active")) {
          item.classList.remove("menu__item--active");
          content.style.width = 0;
      } else {
          item.classList.add("menu__item--active");

          if (windowWidth > breakpointPhone && windowWidth < openMenuWidth) {
              content.style.width = windowWidth - closeMenuWidth + 'px';
          } else if (windowWidth <= breakpointPhone) {
              let num

              for (let i = 0; i < menuItem.length; i++) {

                  if(menuItem[i] === item) {
                      num = menuItem.length - (i + 1)
                  }
              }
              menuAccord.style.transform = `translateX(${listWidth * num}px)`;
              content.style.width = windowWidth - listWidth + 'px';
          } else {
              content.style.width = layoutContentWidth + 'px';
          }  
        
        }
  }
});
}
accordionMenu()




///////слайдер///////

const list = document.querySelector(".slider__list");
const widthContainer = document.querySelector('.slider__wrap').clientWidth;
const arrows = document.querySelector('.slider__arrows');
var pos = 0;



function calcWidthList() {
    const items = list.children.length;
    const widthList = items * widthContainer;
    list.style.width = `${widthList}px`;
}



function buttonClick(event) {
  console.log(event.target);
    if (event.target.tagName === 'BUTTON') {
        slide(event.target);
    }
}


function slide(target) {
    const vector = target.dataset.vector;
    console.log(vector);
    switch (vector) {
        case 'right':
            slider(vector);
            break;
        case 'left':
            slider(vector);
            break;
    }
}


function slider(vector) {
  if (vector === 'right') {
    pos -= widthContainer;
    translate(pos);
  } else {
    pos += widthContainer;
    translate(pos);
  }
} 

function translate(pos) {
  list.style.transform = `translateX(${pos}px)`
}



arrows.addEventListener('click', buttonClick);

window.addEventListener('load', calcWidthList);


////////форма////////
 
const myForm = document.querySelector ('.form');
const sendButton = document.querySelector('.payment__button');

sendButton.addEventListener('click', function(event) {
  event.preventDefault();

  if (validateForm(myForm)) {
      const data = {
        name: myForm.elements.name.value,
        phone: myForm.elements.phone.value,
        street: myForm.elements.street.value,
        house: myForm.elements.house.value,
        call: myForm.elements.call.value,
        floor: myForm.elements.floor.value,
        comment: myForm.elements.comment.value,
        apartment: myForm.elements.apartment.value,
        number: myForm.elements.number.value,
      };

    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open( 'POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function() {
      if(xhr.response.status) {
        console.log("Все ok!");
        }
    });
  }
});
function validateForm(form){
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false; 
  }
  if (!validateField(form.elements.street)) {
    valid = false; 
  }
  if (!validateField(form.elements.house)) {
    valid = false; 
  }
  if (!validateField(form.elements.floor)) {
    valid = false; 
  }
  if (!validateField(form.elements.number)) {
    valid = false; 
  }
  if (!validateField(form.elements.call)) {
    valid = false; 
  }
  if (!validateField(form.elements.apartment)) {
    valid = false; 
  }
  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.nextElementSibling.textContent = field.validationMessage;
    return false;
  } else {
    field.nextElementSibling.textContent = "";
    return true;
  }
}























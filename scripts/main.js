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
  closeElement.addEventListener('click', function(event) {
    event.preventDefault(); 
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
const controls = document.querySelector('.slider__arrows');
var pos = 0;


function calcWidthList() {
    const itemCount = list.children.length;
    const widthList = itemCount * widthContainer;

    list.style.width = `${widthList}px`;
}



function handlerClick(event) {
    if (event.target.tagName === 'BUTTON') {
        slide(event.target);
    }
}



function slide(target) {
    const vector = target.dataset.vector;

    switch (vector) {
        case 'next':
            slideTo(vector);
            break;
        case 'prev':
            slideTo(vector);
            break;
    }
}



function slideTo(vector) {
    const active = document.querySelector('.active');
    if (vector === 'next') {
        var nextElement = active.nextElementSibling;
    } else {
        var prevElement = active.previousElementSibling;
    }



    if (nextElement) {
        pos -= widthContainer;
        active.classList.remove('active');
        nextElement.classList.add('active');
        translate(pos);
    } else if (prevElement) {
        pos += widthContainer;
        active.classList.remove('active');
        prevElement.classList.add('active');
        translate(pos);
    }
}


function translate(pos) {
    list.style.transform = `translateX(${pos}px)`;
}

controls.addEventListener('click', handlerClick);
window.addEventListener('load', calcWidthList);


////////форма////////
 
const myForm = document.querySelector ('.form');
const sendButton = document.querySelector('.payment__button');

sendButton.addEventListener('click', e => {
  e.preventDefault();

  if (validateForm(myForm)) {
    console.log('right');
      const data = {
        name: myForm.elements.name.value,
        phone: myForm.elements.phone.value,
        comment: myForm.elements.comment.value,
        to: "mail@mail.ru"
      };

    const xhr = new XMLHttpRequest();
    var openOverlayForm;
    xhr.responseType = "json";
    xhr.open( 'POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', function() {
      if (xhr.status === 200) {
        document.body.appendChild(openOverlayForm(xhr.response.message));
    } else {
      document.body.appendChild(openOverlayForm(xhr.response.message));
  }
    });
  }



  function openOverlayForm(content) {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("over-lay");
    overlayElement.addEventListener("click", e => {
      if (e.target === overlayElement) {
      closeElement.click();
      }
    });

    const containerElement = document.createElement("div");
    containerElement.classList.add("overlay-container");


    const contentElement = document.createElement("div");
    contentElement.classList.add("overlay-content");
    contentElement.innerHTML = content;


    const closeElement = document.createElement("button");
    closeElement.classList.add("button_close");
    closeElement.textContent = "закрыть";
    closeElement.addEventListener("click", function() {
        document.body.removeChild(overlayElement);
    });


    overlayElement.appendChild(containerElement);
    containerElement.appendChild(contentElement);
    containerElement.appendChild(closeElement);

    return overlayElement;

}


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
  return valid;
}

function validateField(formblock) {
  formblock.nextElementSibling.textContent = formblock.validationMessage;
  return formblock.checkValidity();
}
})



//map//
ymaps.ready(init);


function init() {
    var map = new ymaps.Map('map',{
        center: [59.92, 30.32],
        zoom:12,
        controls:['zoomControl'],
        behaviors: ['drag']
    });

    var placemark = new ymaps.Placemark([59.97, 30.31] , {
        hintContent: 'BurgerShop'
        } , {
        iconImageHref: 'png/mapmarker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57],
        iconLayout: 'default#image'
    });

    var placemark2 = new ymaps.Placemark([59.94, 30.38] , {
        hintContent: 'BurgerShop'
        } , {
        iconLayout: 'default#image',
        iconImageHref: 'png/mapmarker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });

    var placemark3 = new ymaps.Placemark([59.91, 30.49] , {
        hintContent: 'BurgerShop'
        } , {
        iconLayout: 'default#image',
        iconImageHref: 'png/mapmarker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
    });

    map.geoObjects.add(placemark);
    map.geoObjects.add(placemark2);
    map.geoObjects.add(placemark3);
}

 //api video player//
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtubeplayer", {
        width: "660",
        height: "405",
        videoId: "DY_RHowHIFs",
        playerVars: {
            controls: 0,
            showinfo: 0,
            autoplay: 0,
            modestbranding: 0,
            disablekb: 0,
            rel: 0
        },
        events: {
          onReady: onPlayerReady,
        }
    });
}


function onPlayerReady() {
  const duration = player.getDuration();
  let interval;


  clearInterval(interval);
  interval = setInterval(() => {
      const completed = player.getCurrentTime();
      const percent = (completed / duration) * 100;

      changeButtonPosition(percent);
  }, 1000);
}



const playerStart = document.querySelector('.player__start');
$('.player__start').on("click", e => {
  e .preventDefault()
  const block = $(e.currentTarget);
  const playerStatus = player.getPlayerState();



  if (playerStatus !== 1) {
      player.playVideo();
      $('.player__arrow').addClass('none');
      $('.player__start').addClass('paused');
  } else {
      player.pauseVideo();
      $('.player__arrow').removeClass('none');
      $('.player__start').removeClass('paused');
  } 
});



$('.player__arrow').on("click", e => {
  e .preventDefault()
  $('.player__arrow').addClass('none');
  $('.player__start').addClass('paused');
  player.playVideo();
});



$('.player__back').on('click', e => {
  e.preventDefault()


  const bar = $(e.currentTarget);


  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercent = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercent;


  player.seekTo(newPlayerTime);
  changeButtonPosition(percent);

})



$('.player__volume-line').on('click', e => {
  e.preventDefault()


  const volume = 100;
  const volumeLine = $(e.currentTarget);


  const newVolumePosition = e.pageX - volumeLine.offset().left;
  const clickedVolumePercent = (newVolumePosition / volumeLine.width()) * 100;
  const newVolume = (volume / 100) * clickedVolumePercent;


  player.setVolume(newVolume);
  changeVolumePosition(newVolume);
})


function changeButtonPosition(percent) {
  $('.player__back-button').css({
      left: `${percent}%`
  });
}

function changeVolumePosition(newVolume) {
  $('.player__volume-button').css({
      left: `${newVolume}%`
  });
}




//onePage scroll//

(function () {
  const container = document.querySelector('.wrapper');
  const nav = document.querySelector('.switcher');
  const menu = document.querySelector('.navigation__list');
  const burgerClick = document.querySelector('.burgerclick__list');
  const orderButton = document.querySelectorAll('.button--knock');
  const mainDown = document.querySelector('.main__down-link')

  const duration = 1500;
  let posY = 0;
  let isAmimate = false



  window.addEventListener('wheel', handlerWheel);
  nav.addEventListener('click', handlerClick);
  menu.addEventListener('click', menuHandlerClick);
  burgerClick.addEventListener('click', burgerClickHandlerClick);
  mainDown.addEventListener('click', downHandlerClick);
 
  function downHandlerClick(e) {
    e.preventDefault();


    if (e.target.parentNode.tagName === "A") {
        

        const index = e.target.parentNode.getAttribute('href');
        const [active, activenav] = getActives();


        reActive(false, active, 'section', null, index);
        reActive(false, activenav, 'switcher__item', null, index);

        
        posY = index;
        translate(posY);
    }
}

  function burgerClickHandlerClick(e) {
    e.preventDefault();


    if (e.target.tagName === 'A') {

        
        const index = e.target.getAttribute('href');
        const [active, activenav, activemenu, activetabletMenu] = getActives();

        reActive(false, active, 'section', null, index);
        reActive(false, activenav, 'switcher__item', null, index);

        
        posY = index;
        translate(posY);
    }
}

  for (btn of orderButton) {
    btn.addEventListener('click', buttonHandlerClick);
}



function buttonHandlerClick(e) {
    e.preventDefault();
    if (e.target.tagName === 'A') {
        const index = e.target.getAttribute('href');
        const [active, activenav,  activebutton] = getActives();


        reActive(false, active, 'section', null, index);
        reActive(false, activenav, 'switcher__item', null, index);
        
        posY = index;
        translate(posY);
    }
}

function menuHandlerClick(e) {
  e.preventDefault();


  if (e.target.tagName === 'A') {

      
      const index = e.target.getAttribute('href');
      const [active, activenav, activemenu] = getActives();


      reActive(false, active, 'section', null, index);
      reActive(false, activenav, 'switcher__item', null, index);
      
      posY = index;
      translate(posY);

  }
}

  function handlerClick(e) {
      e.preventDefault();


      if (e.target.tagName === 'A') {
          const index = e.target.getAttribute('href');
          const [active, activenav, activemenu] = getActives();


          reActive(false, active, 'section', null, index);
          reActive(false, activenav, 'switcher__item', null, index);

          

          posY = index;
          translate(posY);
      }
  }

  function handlerWheel(e) {
      if (isAmimate) return;
      if (e.deltaY > 0) {
          const isNext = isSlide('next');
          slideTo(isNext, 'next');
      } else {
          const isPrev = isSlide('previous');
          slideTo(isPrev, 'prev');
      }
  }

  function slideTo(resolve, vector) {
      if (vector === 'next' && resolve) {
          posY++;
         translate(posY);

      }
      if (vector === 'prev' && resolve) {
          posY--;
          translate(posY);
      }
  }

  function translate(pos) {
      container.style.transform = `translate3d(0, ${-pos * 100}%,0)`;
      container.style.transition = `all ${duration}ms ease 0s`;
      isAmimate = true
      setTimeout(() => {
          isAmimate = false;
      }, duration)
  }

  function isSlide(vector) {
      const [active, activenav] = getActives()


      if (active[`${vector}ElementSibling`]) {
          reActive(true, active, 'section', vector);
          reActive(true, activenav, 'switcher__item', vector);
          return true
      }
  }

  function reActive(isSibling, elem, _class, vector, index) {

      if (isSibling) {
          elem.classList.remove(`${_class}_active`);
          elem[`${vector}ElementSibling`].classList.add(`${_class}_active`);
      } else {
          elem.classList.remove(`${_class}_active`);
          document.querySelectorAll(`.${_class}`)[index].classList.add(`${_class}_active`);
      }
  }

  function getActives() {
      const active = document.querySelector('.section_active');
      const activenav = document.querySelector('.switcher__item_active');
      return [active, activenav];
  }

  

})();
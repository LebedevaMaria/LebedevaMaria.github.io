window.addEventListener('scroll', function() {
    let menu = document.querySelector('.menu');
    let shortInformation = document.querySelector('.short-information');
    let shortInformationHeight = shortInformation.offsetHeight;
    let scrollPosition = document.documentElement.scrollTop;
    
    if (scrollPosition >= shortInformationHeight) {
      menu.classList.add('menu-fixed');
    } else {
      menu.classList.remove('menu-fixed');
    }
});


//Галерея
let popupGallery = document.querySelector(".popup_gallery");
let popupGalleryContainer = popupGallery.querySelector(".popup__block");
let popupGalleryImage = popupGalleryContainer.querySelector(".popup__image");

let popupGalleryClose = popupGallery.querySelector(".popup__close");
let popupGalleryNext = popupGallery.querySelector(".popup__next-button");
let popupGalleryPrev = popupGallery.querySelector(".popup__prev-button");

let imageContainerArray = document.querySelectorAll(".picture__card");

let currentImageContainer = document.querySelector(".picture__card");
let currentImageLink = currentImageContainer.querySelector(".picture__image").src;

function openPopupGallery() {
    popupGallery.classList.add("popup_opened");
    popupGalleryContainer.classList.add("popup__block_opened");
}

function closePopupGallery() {
    popupGallery.classList.remove("popup_opened");
    popupGalleryContainer.classList.remove("popup__block_opened");
}

function changeNext() {
    let temp = currentImageContainer.nextElementSibling;
    if (temp == null) {
        return;
    }
    currentImageContainer = temp;
    currentImageLink = currentImageContainer.querySelector(".picture__image").src;
}

function changePrev() {
    let temp = currentImageContainer.previousElementSibling;
    if (temp == null) {
        return;
    }
    currentImageContainer = temp;
    currentImageLink = currentImageContainer.querySelector(".picture__image").src;
}

function changeNavigationButtons() {
    let temp = currentImageContainer.previousElementSibling;
    if (temp == null) {
        popupGalleryPrev.classList.add("popup__prev-button_inactive");
    } else {
        popupGalleryPrev.classList.remove("popup__prev-button_inactive");
    }
    temp = currentImageContainer.nextElementSibling;
    if (temp == null) {
        popupGalleryNext.classList.add("popup__next-button_inactive");
    } else {
        popupGalleryNext.classList.remove("popup__next-button_inactive");
    }
}

function setImage() {
    popupGalleryImage.src = currentImageLink;
}

imageContainerArray.forEach(function (item) {
    item.addEventListener("click", function () {
        console.log(item);
        currentImageContainer = item;
        currentImageLink = item.querySelector(".picture__image").src;
        setImage();
        openPopupGallery();
        changeNavigationButtons();
    })
})

popupGalleryNext.addEventListener("click", function (evt) {
    changeNext();
    setImage();
    changeNavigationButtons();
    evt.stopPropagation();
})

popupGalleryPrev.addEventListener("click", function (evt) {
    changePrev();
    setImage();
    changeNavigationButtons();
    evt.stopPropagation();
})

popupGalleryClose.addEventListener("click", function (evt) {
    closePopupGallery();
    evt.stopPropagation();
})

popupGallery.addEventListener("click", function (evt) {
    closePopupGallery();
    evt.stopPropagation();
})

console.log("Подключено");



//Форма обратной связи
let contactButton = document.querySelector(".footer__text");

let popupContact = document.querySelector(".popup_contact");
let popupContactContainer = popupContact.querySelector(".popup__block")

let popupContactClose = popupContact.querySelector(".popup__close-second");
let formElement = document.querySelector(".popup__form");
let formSaveButton = formElement.querySelector(".popup__save");

let formInputEmail = formElement.querySelector(".popup__input_email");
let formInputText = formElement.querySelector(".popup__input_text");

let formErrorEmail = formElement.querySelector(".popup__error_email");
let formErrorText = formElement.querySelector(".popup__error_text");

popupContactContainer.addEventListener("click", function (evt) {
    evt.stopPropagation();
})

contactButton.addEventListener("click", function () {
    popupContact.classList.toggle("popup_opened");
    popupContactContainer.classList.toggle("popup__block_opened")
})

popupContactClose.addEventListener("click", function (evt) {
    popupContact.classList.toggle("popup_opened");
    popupContactContainer.classList.toggle("popup__block_opened")
    evt.stopPropagation();
})

popupContact.addEventListener("click", function() {
    popupContact.classList.toggle("popup_opened");
    popupContactContainer.classList.toggle("popup__block_opened")
})


formSaveButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    submitForm(formElement);
})





let showInputError = (elementInput, elementError) => {
    elementInput.classList.add("popup__input_error");
    elementError.classList.remove("popup__error_inactive");
}
let hideInputError = (elementInput, elementError) => {
    elementInput.classList.remove("popup__input_error");
    elementError.classList.add("popup__error_inactive");
}
let correct = (elementInput, elementError) => {
    if (!elementInput.validity.valid) {
        showInputError(elementInput, elementError);
    } else {
        hideInputError(elementInput, elementError);
    }
}

function changeButton() {
    if (formInputEmail.validity.valid && formInputText.validity.valid) {
        formSaveButton.classList.remove("popup__save_inactive");
    } else {
        formSaveButton.classList.add("popup__save_inactive");
    }
}

formInputEmail.addEventListener("input", () => {
    correct(formInputEmail, formErrorEmail);
    changeButton();
});
formInputText.addEventListener("input", () => {
    correct(formInputText, formErrorText);
    changeButton();
});


//Временный попап

if (sessionStorage["popupWasClosed"] != 'yes') {
    setTimeout(function() {
        showPopup();
        sessionStorage["popupWasClosed"] = 'yes';
    }, 15000);
}

let popupTime = document.querySelector(".popup_time");
// let popuTimeContainer = popupTime.querySelector(".popup__block");
let popupTimeClose = popupTime.querySelector(".popup__close-second");

function showPopup() {
    popupTime.classList.add("popup_opened");
    // popupTimeContainer.classList.add("popup__block_opened");
}

function closePopupTime() {
    popupTime.classList.remove("popup_opened");
    // popupTimeContainer.classList.remove("popup__block_opened");
}

popupTimeClose.addEventListener("click", function () {
    closePopupTime();
    evt.stopPropagation();
})


//Таймер
let endDate = new Date('Jun 15, 2024 23:59:59').getTime();

let timer = setInterval(function() {
    let now = new Date().getTime();
    let distance = endDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = 
    `<p class="timer-text">${days} дней ${hours} часов ${minutes} минут ${seconds} секунд</p>`
    ;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = "Время истекло";
    }
}, 1000);


//Отправка формы
function submitForm(form) {
    let buttonForm = form.querySelector('.popup__save');
    buttonForm.value = "Отправляем";
    buttonForm.classList.add("loading");
    buttonForm.inactive = true;
    document.body.style.cursor = 'wait';

    fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: ""
  }).then((response) => {
        if (response.ok) {
          buttonForm.value = "Успешео отправлено";
          buttonForm.classList.remove("loading");
          buttonForm.classList.add("success");
          document.body.style.cursor = 'default';
          let inputList = Array.from(form.querySelectorAll());
          inputList.forEach(input => input.textContent='');
        } else {
          buttonForm.value = "Что-то пошло не так";
          buttonForm.classList.remove("button-loading");
          buttonForm.classList.add("failure");
          document.body.style.cursor = 'default';
        }
      })}

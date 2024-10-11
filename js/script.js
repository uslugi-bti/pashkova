function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const body = document.querySelector("body");
const productLinks = document.querySelectorAll(".products-item__button #product");
const productPopups = document.querySelectorAll(".popup-product");
const productPopupClose = document.querySelectorAll(".popup-product__close");
const nameProduct = document.querySelectorAll(".popup-product__title h1");

const openFormBuy = document.querySelectorAll(".popup-product__link #buy");
const popupForm = document.querySelector(".form-popup");

const headerLink = document.querySelector(".header__link #callback");

const detailButton = document.querySelector(".fullscreen__link #detail");
const targetDetail = document.querySelector(".goal");

for (let i = 0; i < productLinks.length; i++) {
    productLinks[i].addEventListener("click", function (event) {
        body.classList.add("lock");
        productPopups[i].classList.add("open");
        event.preventDefault();
    });
}

for (let i = 0; i < productPopups.length; i++) {
    productPopups[i].addEventListener("click", function (event) {
        if (!event.target.closest(".popup-product__body")) {
            body.classList.remove("lock");
            productPopups[i].classList.remove("open");
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.which == 27) {
        for (let i = 0; i < productLinks.length; i++) {
            body.classList.remove("open");
            productPopups[i].classList.remove("open");
        }
        body.classList.remove("lock");
        popupForm.classList.remove("open");
        document.querySelector(".form textarea").innerHTML = "";
    }
});

for (let i = 0; i < openFormBuy.length; i++) {
    openFormBuy[i].addEventListener("click", function (event) {
        body.classList.add("lock");
        popupForm.classList.add("open");
        event.preventDefault();
        productPopups[i].classList.remove("open");

        let titleProduct = nameProduct[i].innerHTML;

        document.querySelector(".form textarea").innerHTML = `Хочу замовити товар "${titleProduct}"`;
    });
}

popupForm.addEventListener("click", function (event) {
    if (!event.target.closest(".form")) {
        body.classList.remove("lock");
        popupForm.classList.remove("open");
        document.querySelector(".form textarea").innerHTML = "";
    }
});

headerLink.addEventListener("click", function (event) {
    body.classList.add("lock");
    popupForm.classList.add("open");
    event.preventDefault();
});

detailButton.addEventListener("click", function (event) {
    targetDetail.scrollIntoView({ behavior: "smooth" });
    event.preventDefault();
});
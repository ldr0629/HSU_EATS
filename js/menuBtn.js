const menuBtn = document.querySelector(".top-bars__menu");
const menuBar = document.querySelector(".menu-bars__container");
const menuCloseBtn = document.querySelector(".menu-bars__btn__close");

function openMenu() {
    document.body.style.overflow = "hidden";
    menuBar.classList.toggle("invisible");
    menuCloseBtn.addEventListener("click", closeMenu);
}

function closeMenu() {
    document.body.style.overflow = "visible";
    menuBar.classList.toggle("invisible");
}

menuBtn.addEventListener("click", openMenu);
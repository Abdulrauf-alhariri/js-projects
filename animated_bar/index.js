const hamburger = document.querySelector(".hamburger");
const wrapList = document.querySelector(".wrap-list");
const mainContent = document.querySelector(".wrapper-body");
const body = document.querySelector(".body");

hamburger.addEventListener("click", change);

function change() {
  wrapList.classList.toggle("active-list");
  mainContent.classList.toggle("hidden");
  body.classList.toggle("body-pink");
}

const clock = document.getElementById("clock");
const partyButton = document.querySelector(".btn");
const image = document.querySelector(".clock-image");
const partyText = document.querySelector(".text");
let number = 0;

function digitalClock() {
  // getting the current time as a string
  // Then splitting the string and getting the first element
  const date = new Date();
  let currentTime = date.toTimeString();
  currentTime = currentTime.split(" ");

  clock.textContent = currentTime[0];
}

function partyTime() {
  // Checking if the btn has the btn-black class
  if (partyButton.className.includes("btn-black")) {
    partyButton.className = partyButton.className.replace(
      "btn-black",
      "btn-blue"
    );
    partyButton.innerText = "Party over!";
    image.setAttribute("src", "images/cat_2.jpg");
    partyText.innerText = "Lets party!";

    // If no, so it has the blue-btn class
  } else {
    partyButton.className = partyButton.className.replace(
      "btn-blue",
      "btn-black"
    );
    partyButton.innerText = "Party Time!";
    image.setAttribute("src", "images/cat_1.jpg");
    partyText.innerText = "good afternon!";
  }
  digitalClock();
}

window.onload = function () {
  partyButton.addEventListener("click", partyTime);
  const digitalTime = setInterval(digitalClock, 1000);
};

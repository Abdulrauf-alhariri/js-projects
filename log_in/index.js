const pageBody = document.querySelector("#hi");
const app = document.querySelector("#application");
const log_in = document.querySelector(".log_in");
const cross = document.querySelector(".line-one");
const cross2 = document.querySelector(".line-two");

// Getting the submit button and the clear button
const submit = document.querySelector("#submit");
const clear = document.querySelector("#clear");

// Getting the email and password inputs
const email = document.querySelector("#email");
const password = document.querySelector("#password");

app.addEventListener("click", makeVisibile);
cross.addEventListener("click", makeUnvisible);
cross2.addEventListener("click", makeUnvisible);
clear.addEventListener("click", clearLogIn);

// A function to make the authorizn window visibile
function makeVisibile() {
  // Displaying the window
  log_in.classList.add("visible");
  // changing the background color of the window
  pageBody.style.backgroundColor = "rgba(0,0,0,.4)";
}

function makeUnvisible() {
  log_in.classList.remove("visible");
  pageBody.style.backgroundColor = "white";
}

function clearLogIn() {
  email.value = "";
  password.value = "";
}

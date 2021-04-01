// This will select the first kind of tag and ignore the rest
const para = document.querySelector("div.error");

// This select all of kind, it returns an array
// Youo can use fetchAll
const pars = document.querySelectorAll("p");
const errors = document.querySelectorAll(".error");

// Get an element by id
const title = document.getElementById("page-title");

// // Get element by class name, returns an array
// // You can't use fetchAll()
const errors = document.getElementsByClassName("error");
console.log(errors);

// Get elements by tag name
const paras = document.getElementsByTagName("p");

// InnerText is a property, and with it we can get the text inside the tag
para.innerText = "ninjas are awesome";
// This will update the text
para.innerText += " new text";

const content = document.querySelector(".content");
// This will  over write the html inside the tag
content.innerHTML = "<h2>This is a new H<h2>";
// This will add a new html tag inside the tag
content.innerHTML += "<h2>This is a new H<h2>";

// This will get the attribute
console.log(link.getAttribute("href"));
// Set attribute
link.setAttribute("href", "https://www.index.js");
link.innerText = "The net";

const pars = document.querySelector("p");

// With this we can add or remove clasess
console.log(pars.classList);
pars.classList.add("hi");
pars.classList.remove("hi");

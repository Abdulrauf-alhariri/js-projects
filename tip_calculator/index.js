const amount = document.querySelector(".bill-input");
const nrPeople = document.querySelector(".people-input");
const selector = document.querySelector(".calc-selector");
const button = document.querySelector(".btn");
let results = 0;

function calculate() {
  const footer = document.querySelector(".clac-footer");
  const tip = document.querySelector("#tip");
  const cost = parseInt(amount.value);
  const people = parseInt(nrPeople.value);
  const tipCost = parseFloat(selector.value);
  if (amount.value && nrPeople.value && selector.value && nrPeople.value > 0) {
    if (footer.className.includes("hidden")) {
      footer.className = footer.className.replace("hidden", "");
    }

    results = (cost * tipCost + cost) / people;
    console.log(results);
    tip.textContent = results;
  } else {
    throw new Error("You should fyll out the informations");
  }
}

button.addEventListener("click", function () {
  try {
    calculate();
  } catch (e) {
    alert(e);
  }
});

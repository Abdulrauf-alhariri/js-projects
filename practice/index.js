const checlList = document.getElementById("Checklist");

const items = checlList.querySelectorAll("li");

items.forEach((item) => {
  item.addEventListener("click", editItem);
});

function editItem() {
  this.className = "edit";
  const input = this.querySelector("input");
  input.focus();
  input.setSele;
}

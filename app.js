window.addEventListener("load", function () {
  const canvas = document.querySelector("#canvas");
  const image = new Image();
  // Defininfe if we are working with 2d or 3d
  const ctx = canvas.getContext("2d");
  image.src = "maze/cucumber.png";

  // Resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // Variables
  let painting = false;

  function startPostion(e) {
    painting = true;
    draw(e);
  }
  function endPostion() {
    painting = false;
    ctx.beginPath();
  }
  ctx.drawImage(image, 50, 100, 50, 50);
  ctx.drawImage(image, 100, 100, 50, 50);
  ctx.clearRect(50, 100, 50, 50);
  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
  // EventsListeners
  canvas.addEventListener("mousedown", startPostion);
  canvas.addEventListener("mouseup", endPostion);
  canvas.addEventListener("mousemove", draw);
});

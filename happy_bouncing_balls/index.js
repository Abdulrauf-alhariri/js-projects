// Creating a constructor function
const Balls = function (x, y, raduis) {
  // This will choose a randomly color for the bolls
  this.color =
    "rgb(" +
    Math.random() * 256 +
    "," +
    Math.random() * 256 +
    "," +
    Math.random() * 256 +
    ")";
  this.x = x;
  this.y = y;
  this.raduis = raduis;
  this.direction = Math.random() * Math.PI * 2;
  this.speed = Math.random() * 3 + 1;

  // Will draw a whole boll
  this.drawBalls = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2);
    ctx.fill();
  };

  // This will update the position of the ball in a 360 degree space
  this.updatePosition = function (width, height) {
    // Cos determine if it will go left or right, it returns  a value between 1 or -1
    this.x += Math.cos(this.direction) * this.speed;
    // Sin determine if it will go up or down, it returns a value between 1 or -1
    this.y += Math.sin(this.direction) * this.speed;

    // This will bounce the balls back
    if (this.x - this.raduis < 0) {
      this.x = this.raduis;
      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
    }
    // Checking the right side
    if (this.x + this.raduis > width) {
      this.x = width - this.raduis;

      this.direction = Math.atan2(
        Math.sin(this.direction),
        Math.cos(this.direction) * -1
      );
    }

    // Chceking the top page
    if (this.y - this.raduis < 0) {
      this.y = this.raduis;
      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
    }

    // Checking the bottom page
    if (this.y + this.raduis > height) {
      this.y = height - this.raduis;
      this.direction = Math.atan2(
        Math.sin(this.direction) * -1,
        Math.cos(this.direction)
      );
    }
  };
};

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const balls = [];

const height = document.documentElement.clientHeight - 5;
const width = document.documentElement.clientWidth;

for (let i = 0; i < 50; i++) {
  let ball = new Balls(width * 0.5, height * 0.5, 25);
  balls.push(ball);
}
function loop() {
  window.requestAnimationFrame(loop);
  canvas.width = width;
  canvas.height = height;
  for (let index = 0; index < 50; index++) {
    let ball = balls[index];
    ball.drawBalls();
    ball.updatePosition(width, height);
  }
}

loop();

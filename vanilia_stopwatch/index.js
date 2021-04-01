let ms = 0;
let s = 0;
let m = 0;

let timer;
let stopWatch = document.getElementById("stopWatch");

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", start);

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", stop);

const reSet = document.getElementById("reset");
reSet.addEventListener("click", reset);

function start() {
  if (!timer) {
    // SetInterval let the browser play a command automaticlly
    // In this case this will work each 10 milliseconds, it takes two arguments. A function and milli seconds
    // Think it as a while loop
    timer = setInterval(run, 10);
  }
}

function run() {
  ms++;
  stopWatch.innerHTML =
    (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + ":" + ms;

  if (ms === 100) {
    ms = 0;
    s++;
  }

  if (s === 60) {
    s = 0;
    m++;
  }
}

function stop() {
  clearInterval(timer);
  timer = false;
}

function reset() {
  if (!timer) {
    m = 0;
    s = 0;
    ms = 0;

    stopWatch.innerHTML = "00:00:00";
  }
}

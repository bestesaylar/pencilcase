import "./styles.css";
import { pointsAlongLine } from "./vector.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "rgb(255, 252, 243)";
ctx.strokeStyle = "#FFA07A";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let last_x = 0;
let last_y = 0;

let penDown = false;
let buttonState = 0;
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let clearbtn = document.getElementById("clear");

function paintStart(x, y) {
  penDown = true;
  last_x = x;
  last_y = y;
}

function norm_random(size) {
  return (Math.random() - 0.5) * size;
}

function paintMove(x, y) {
  ctx.beginPath();

  ctx.strokeStyle = "	#FA8072";
  ctx.lineWidth = 1;
  ctx.moveTo(last_x, last_y);
  ctx.lineTo(x, y);
  ctx.moveTo(last_x, last_y);
  ctx.lineTo((x + last_x) / 3, last_y - y / 2);
  ctx.stroke();

  last_x = x;
  last_y = y;

  // let interpolatedPoints = pointsAlongLine(x, y, last_x, last_y, 1);
  // console.log(interpolatedPoints);
}

function paintMove2(x, y) {
  ctx.beginPath();
  
  ctx.fillStyle = "RGB(205, 92, 92,0.6)";
  let thickness = 2;
  ctx.lineWidth = thickness;
  ctx.moveTo(last_x, last_y);
  ctx.stroke();

  let randomness = 40;

  for (var i = 0; i < 10; i++) {
    ctx.fillStlye = `hsl(${Math.random() * 360},%90,%60)`;
    ctx.arc(
      x + norm_random(randomness),
      y + norm_random(randomness),
      1,
      0,
      Math.PI * 2
    );
    // ctx.fill();
  }
  //  ctx.fillRect(
  //    x+Math.random()*randomness,
  //    y+Math.random()*randomness,
  //    10,
  //    10
  //  )
  ctx.fill();
  last_x = x;
  last_y = y;

  //MINE
  // ctx.beginPath();

  // ctx.lineWidth = 1;
  // ctx.moveTo(last_x, last_y);
  // ctx.arc(x, y, 2, 0, Math.PI * 2);
  // ctx.lineTo(x, y);

  // ctx.stroke();
  // ctx.beginPath();
  // ctx.fillStyle = "#CD5C5C";
  // ctx.arc(x, y, 5, 0, Math.PI * 2);
  // ctx.fill();
  // last_x = x;
  // last_y = y;
}

function paintMove3(x, y) {
  //MINE
  //  //thikness
  //   ctx.beginPath();
  //   let thinkness=10;
  //   ctx.lineWidth = thinkness;
  //   // ctx.fillStyle = "#EC7063";

  //   ctx.moveTo(last_x, last_y);
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  //   // ctx.beginPath();
  //   // ctx.arc(x,y,thinkness/2,0,Math.PI*2);

  //   ctx.fill();
  //   last_x = x;
  //   last_y = y;

  ctx.beginPath();
  ctx.strokeStyle = "#FFA07A";
  let thickness = 1;
  ctx.lineWidth = 1;
  ctx.moveTo(last_x, last_y);

  let interpolatedPoints = pointsAlongLine(x, y, last_x, last_y, 1);
  console.log(interpolatedPoints);
  let randomness = 40;

  interpolatedPoints.forEach(function (p) {
    ctx.beginPath();
    ctx.arc(
      p.x + norm_random(randomness),
      p.y + norm_random(randomness),
      Math.random() * 5,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    // ctx.fill();
  });

  // for (var i = 0; i < 10; i++) {
  //   // ctx.fillStyle = `hsl(${Math.random() * 360},90%,60%)`;
  //   ctx.beginPath();
  //   ctx.arc(
  //     x + norm_random(randomness),
  //     y + norm_random(randomness),
  //     Math.random() * 5,
  //     0,
  //     Math.PI * 2
  //   );
  //   ctx.stroke();
  //   // ctx.fill();
  // }
  last_x = x;
  last_y = y;
}

canvas.addEventListener("mousedown", function (evt) {
  let x = evt.clientX;
  let y = evt.clientY;
  paintStart(x, y);
});

canvas.addEventListener("touchstart", function (evt) {
  let touches = Array.from(evt.touches);
  let touch = touches[0];

  let x = touch.clientX;
  let y = touch.clientY;

  last_x = x;
  last_y = y;
});

canvas.addEventListener("touchmove", function (evt) {
  evt.preventDefault();
  let touches = Array.from(evt.touches);
  let touch = touches[0];

  penDown = true;
  let x = touch.clientX;
  let y = touch.clientY;

  if (buttonState === 1) {
    paintMove(x, y);
  } else if (buttonState === 2) {
    paintMove2(x, y);
  } else if (buttonState === 3) {
    paintMove3(x, y);
  }
});

canvas.addEventListener("mousemove", function (evt) {
  if (penDown === false) {
    return;
  }
  let x = evt.clientX;
  let y = evt.clientY;
  if (buttonState === 1) {
    paintMove(x, y);
  } else if (buttonState === 2) {
    paintMove2(x, y);
  } else if (buttonState === 3) {
    paintMove3(x, y);
  }
});

canvas.addEventListener("mouseup", function (evt) {
  penDown = false;
});

canvas.addEventListener("mouseout", function (evt) {
  penDown = false;
});

button1.addEventListener("click", function () {
  if (buttonState === 1) {
    buttonState = 0;
    button1.style.backgroundColor = "#F1948A";
  } else {
    buttonState = 1;
    button1.style.backgroundColor = "#fdedec";
    button2.style.backgroundColor = "#fdedec";
    button3.style.backgroundColor = "#fdedec";
  }
});

button2.addEventListener("click", function () {
  if (buttonState === 2) {
    buttonState = 0;
    button2.style.backgroundColor = "#F1948A";
  } else {
    buttonState = 2;
    button2.style.backgroundColor = "#fdedec";
    button1.style.backgroundColor = "#fdedec";
    button3.style.backgroundColor = "#fdedec";
  }
});

button3.addEventListener("click", function () {
  if (buttonState === 3) {
    buttonState = 0;
    button3.style.backgroundColor = "#F1948A";
  } else {
    buttonState = 3;
    button3.style.backgroundColor = "#fdedec";
    button1.style.backgroundColor = "#fdedec";
    button2.style.backgroundColor = "#fdedec";
  }
});

clearbtn.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(255, 252, 243)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  button1.style.backgroundColor = "#FFFCF3";
  button2.style.backgroundColor = "#FFFCF3";
  button3.style.backgroundColor = "#FFFCF3";
});

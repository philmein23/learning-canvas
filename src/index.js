import "./styles.css";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
  x: null,
  y: null
};

let colorArray = ["#393E46", "#00ADB5", "#FFF4E0", "#F8B500", "#FC3C3C"];

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function createCircle(x, y, dx, dy, radius, fillStyle) {
  return {
    x,
    y,
    dx,
    dy,
    radius,
    minRadius: radius,
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fillStyle = fillStyle;
      context.fill();
    },
    update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      let isXwithinDistance = mouse.x - this.x < 50 && mouse.x - this.x > -50;
      let isYwithinDistance = mouse.y - this.y < 50 && mouse.y - this.y > -50;
      if (isXwithinDistance && isYwithinDistance) {
        if (this.radius < 60) {
          this.radius += 2;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    }
  };
}

let circlesArray = [];
function generateRandomCircles(maxCircles = 20) {
  for (let i = 0; i <= maxCircles; i++) {
    let radius = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 3;
    let dy = (Math.random() - 0.5) * 3;

    let fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];

    circlesArray.push(createCircle(x, y, dx, dy, radius, fillStyle));
  }
}

generateRandomCircles(800);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let circle of circlesArray) {
    circle.update();
  }
}

animate();

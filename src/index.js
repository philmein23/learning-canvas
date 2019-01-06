import "./styles.css";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;

canvas.width = innerWidth;
canvas.height = innerHeight;

// context.fillStyle = "rgba(221, 143, 131, 0.9)";
// context.fillRect(50, 100, 200, 200);
// context.fillStyle = "rgba(230, 123, 131, 0.9)";
// context.fillRect(400, 400, 200, 200);
// context.fillStyle = "rgba(221, 180, 131, 0.9)";
// context.fillRect(300, 800, 200, 200);

// context.beginPath();
// context.moveTo(200, 100);
// context.lineTo(900, 400);
// context.lineTo(1000, 400);
// context.lineTo(1200, 600);
// context.strokeStyle = "red";
// context.stroke();

let mouse = {
  x: null,
  y: null
};

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

function createCircle(x, y, dx, dy, radius, stroke) {
  return {
    x,
    y,
    dx,
    dy,
    radius,
    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.strokeStyle = stroke;
      context.stroke();
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
        if (this.radius < 40) {
          this.radius += 1;
        }
      } else if (this.radius > 2) {
        this.radius -= 1;
      }

      this.draw();
    }
  };
}

let circlesArray = [];
function generateRandomCircles(maxCircles = 20) {
  for (let i = 0; i <= maxCircles; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - 2 * radius) + radius;
    let y = Math.random() * (innerHeight - 2 * radius) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    let stroke = `rgba(${r}, ${g}, ${b}, 1)`;

    circlesArray.push(createCircle(x, y, dx, dy, radius, stroke));
  }
}

generateRandomCircles(200);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight);
  for (let circle of circlesArray) {
    circle.update();
  }
}

animate();

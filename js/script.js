// === script.js ===

// Copy server IP to clipboard
function startFill(box, valueToCopy, message) {
  const bar = box.querySelector('.fill-bar');
  const text = box.querySelector('.fill-text');

  navigator.clipboard.writeText(valueToCopy).then(() => {
    bar.style.width = '100%';
    text.style.color = '#000';

    setTimeout(() => {
      text.textContent = message;
    }, 2000);

    setTimeout(() => {
      bar.style.width = '0%';
      text.textContent = valueToCopy;
      text.style.color = '#00ffee';
    }, 5000);
  });
}

// Canvas Particle Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('background-animation')?.appendChild(canvas);

let particlesArray = [];
const colors = ['#00ffff', '#ff00ff', '#00ff88'];

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particlesArray) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Toggle mobile nav menu
const toggleBtn = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

toggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  toggleBtn.classList.toggle('active');
});

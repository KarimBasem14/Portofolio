const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

let w, h;
let stars = [];
let meteors = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Gwiazdy
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.2
  });
}

// Meteory
function spawnMeteor() {
  meteors.push({
    x: Math.random() * w,
    y: -20,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 8 + 5,
    angle: Math.PI / 4,
    opacity: 1
  });
  setTimeout(spawnMeteor, Math.random() * 2000 + 1000);
}
spawnMeteor();

function drawStars() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "white";
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > h) {
      star.y = 0;
      star.x = Math.random() * w;
    }
  }
}

function drawMeteors() {
  for (let i = meteors.length - 1; i >= 0; i--) {
    let m = meteors[i];
    ctx.strokeStyle = `rgba(255,255,255,${m.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
    ctx.stroke();

    m.x += m.speed;
    m.y += m.speed;
    m.opacity -= 0.02;

    if (m.opacity <= 0) {
      meteors.splice(i, 1);
    }
  }
}

function animate() {
  drawStars();
  drawMeteors();
  requestAnimationFrame(animate);
}
animate();

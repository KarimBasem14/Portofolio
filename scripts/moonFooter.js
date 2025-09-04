// ripple effects on click
const waterSurface = document.querySelector(".water-surface");
waterSurface.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.style.position = "absolute";
  ripple.style.border = "2px solid rgba(255, 255, 255, 0.2)";
  ripple.style.borderRadius = "50%";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.animation = "rippleExpand 3s ease-out";

  const rect = waterSurface.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  waterSurface.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 3000);
});

// Enhanced moon glow on mouse movement
document.addEventListener("mousemove", (e) => {
  const moon = document.querySelector(".moon");
  const moonGlow = document.querySelector(".moon-glow");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const glowIntensity = 0.3 + mouseY * 0.4;
  moonGlow.style.opacity = glowIntensity;

  // Slight moon movement based on mouse
  const moveX = (mouseX - 0.5) * 20;
  const moveY = (mouseY - 0.5) * 10;
  moon.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Dynamic water animation
let waveOffset = 0;
function animateWater() {
  const waves = document.querySelectorAll(".wave");
  waveOffset += 0.02;

  waves.forEach((wave, index) => {
    const offset = Math.sin(waveOffset + index * 0.5) * 10;
    wave.style.transform = `translateX(${50 + offset}%)`;
  });

  requestAnimationFrame(animateWater);
}

animateWater();

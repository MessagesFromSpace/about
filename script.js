// STARFIELD
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 3000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2
    });
  }
}

let t = 0;
function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  t += 0.008;
  stars.forEach(s => {
    const a = s.alpha * (0.7 + 0.3 * Math.sin(t * s.speed * 100 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 200, 240, ${a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resize();
initStars();
drawStars();
window.addEventListener('resize', () => { resize(); initStars(); });

// COSMIC RAY FLASH
const rayFlash = document.getElementById('rayFlash');
let rayCount = 0;
const rayCounter = document.getElementById('rayCount');

function triggerRay() {
  const hue = Math.random() > 0.5 ? '180, 160, 255' : '96, 212, 255';
  rayFlash.style.background = `radial-gradient(ellipse at ${Math.random()*100}% ${Math.random()*100}%, rgba(${hue}, 0.15), transparent 60%)`;
  rayFlash.style.animation = 'none';
  void rayFlash.offsetWidth;
  rayFlash.style.animation = 'rayFlash 0.4s ease forwards';
  rayCount++;
  rayCounter.textContent = rayCount;

  const tl = document.querySelector('.timeline');
  if (tl) {
    tl.style.borderColor = `rgba(180,160,255,0.6)`;
    setTimeout(() => tl.style.borderColor = '', 300);
  }

  scheduleRay();
}

function scheduleRay() {
  const interval = 3000 + Math.random() * 12000;
  setTimeout(triggerRay, interval);
}

scheduleRay();

// CAROUSEL
const track = document.querySelector('.carousel-track');
const images = track ? Array.from(track.querySelectorAll('img')) : [];
const dotsContainer = document.querySelector('.carousel-dots');
let current = 0;

if (track && images.length) {
  // build dots
  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Image ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + images.length) % images.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('button').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.querySelector('.carousel-prev').addEventListener('click', () => goTo(current - 1));
  document.querySelector('.carousel-next').addEventListener('click', () => goTo(current + 1));

  // swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });
}

// AMBIENT AUDIO
const audio = document.getElementById('ambientAudio');
const audioToggle = document.getElementById('audioToggle');
audio.volume = 0.15;

audioToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    audioToggle.textContent = '⏸ ambient';
    audioToggle.classList.add('playing');
  } else {
    audio.pause();
    audioToggle.textContent = '▶ ambient';
    audioToggle.classList.remove('playing');
  }
});

// SCROLL OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in-up, .timeline-item').forEach(el => observer.observe(el));

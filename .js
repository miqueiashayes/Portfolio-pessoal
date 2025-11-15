const canvas = document.getElementById("stars");

const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

const stars = [];
for (let i = 0; i < 180; i++) {
  const depth = Math.random() * 1.5 + 0.5; // profundidade
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 * depth,
    speed: depth * 0.6,
    alpha: Math.random() * 0.8 + 0.2,
    pulseSpeed: Math.random() * 0.02 + 0.005
  });
}


function drawStar(star) {
  ctx.save();
  ctx.globalAlpha = star.alpha;

 
  const gradient = ctx.createRadialGradient(
    star.x,
    star.y,
    0,
    star.x,
    star.y,
    star.size * 4
  );
  gradient.addColorStop(0, "rgba(255, 80, 80, 1)");
  gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function updateStar(star) {
  star.y += star.speed;


  star.alpha += star.pulseSpeed;
  if (star.alpha >= 1 || star.alpha <= 0.2) {
    star.pulseSpeed *= -1;
  }


  if (star.y > canvas.height) {
    star.y = 0;
    star.x = Math.random() * canvas.width;
  }
}
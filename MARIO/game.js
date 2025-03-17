const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restartButton");

const mario = {
  x: 0, // Initial x position will be set based on the first platform
  y: 0, // Initial y position will be set based on the first platform
  width: 50,
  height: 50,
  color: "red",
  dx: 0,
  dy: 0,
  speed: 3,
  jumpSpeed: 5,
  jumpStrength: -18,
  isJumping: false,
};

let platforms = [];
let gameOver = false;
let cameraX = 0;
const platformSpacing = 200; // Space between platforms
const gravity = 0.7; // Slightly increased gravity

function drawMario() {
  ctx.fillStyle = mario.color;
  ctx.fillRect(mario.x - cameraX, mario.y, mario.width, mario.height);
}

function drawPlatforms() {
  ctx.fillStyle = "green";
  platforms.forEach((platform) => {
    ctx.fillRect(
      platform.x - cameraX,
      platform.y,
      platform.width,
      platform.height
    );
  });
}

function update() {
  if (gameOver) return;

  mario.y += mario.dy;
  mario.x += mario.dx;

  mario.isJumping = true;
  platforms.forEach((platform) => {
    if (
      mario.x < platform.x + platform.width &&
      mario.x + mario.width > platform.x &&
      mario.y < platform.y + platform.height &&
      mario.y + mario.height > platform.y
    ) {
      mario.y = platform.y - mario.height;
      mario.dy = 0;
      mario.isJumping = false;
    }
  });

  if (mario.y + mario.height > canvas.height) {
    gameOver = true;
  } else {
    mario.dy += gravity;
  }

  if (mario.x + mario.width > canvas.width / 2) {
    cameraX = mario.x - canvas.width / 2;
  }

  generatePlatforms();
}

function generatePlatforms() {
  const lastPlatform = platforms[platforms.length - 1];
  if (
    !lastPlatform ||
    lastPlatform.x < canvas.width + cameraX + platformSpacing
  ) {
    const platformWidth = Math.floor(Math.random() * 100) + 50;
    const platformHeight = 10;
    const platformX = lastPlatform ? lastPlatform.x + platformSpacing : 0;
    const platformY = canvas.height - Math.floor(Math.random() * 300) - 100; // Increased minimum height

    platforms.push({
      x: platformX,
      y: platformY,
      width: platformWidth,
      height: platformHeight,
    });

    // Set Mario's initial position on the first platform without jumping
    if (platforms.length === 1) {
      mario.x = platformX;
      mario.y = platformY - mario.height;
      mario.dy = 0; // Ensure no vertical movement
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "skyblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPlatforms();
  drawMario();

  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "48px Arial";
    ctx.fillText("Perdu", canvas.width / 2 - 50, canvas.height / 2);
  } else {
    update();
    requestAnimationFrame(gameLoop);
  }
}

function restartGame() {
  platforms = [];
  generatePlatforms(); // Generate initial platforms and set Mario's position
  mario.dx = 0;
  mario.dy = 0;
  mario.isJumping = false;
  gameOver = false;
  cameraX = 0;

  gameLoop();
}

document.addEventListener("keydown", (event) => {
  if (gameOver) return;

  switch (event.key) {
    case "ArrowUp":
      if (!mario.isJumping) {
        mario.dy = mario.jumpStrength;
      }
      break;
    case "ArrowLeft":
      mario.dx = -mario.speed;
      break;
    case "ArrowRight":
      mario.dx = mario.speed;
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      mario.dx = 0;
      break;
  }
});

restartButton.addEventListener("click", restartGame);

// Generate initial platforms and set Mario's position
generatePlatforms();
gameLoop();

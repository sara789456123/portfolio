let score = 0;
let autoClickers = 0;
let timer = 300; // 5 minutes en secondes
let timerInterval;
let coffreTime = 300; // Temps initial en secondes (5 minutes)
let coffrePoints = 150; // Points obtenus lorsque le coffre s'ouvre
let clickCount = 0;
let clickTimeout;
let isSoundEnabled = true; // Indicateur pour l'état du son

document.getElementById("clicker-image").addEventListener("click", function () {
  clickCount++;
  score++;
  updateScore();

  // Réinitialiser le compteur si l'utilisateur s'arrête de cliquer pendant 1 seconde
  clearTimeout(clickTimeout);
  clickTimeout = setTimeout(() => {
    clickCount = 0;
  }, 1000);

  // Jouer le son après 100 clics consécutifs
  if (clickCount === 100) {
    playSound();
    clickCount = 0; // Réinitialiser le compteur après avoir joué le son
  }
});

document.getElementById("menu-button").addEventListener("click", function () {
  toggleShop();
});

document.getElementById("close-button").addEventListener("click", function () {
  toggleShop();
});

document.getElementById("timer-image").addEventListener("click", function () {
  if (this.src.includes("coffreOpen.png")) {
    score += 150;
    updateScore();
    this.src = "coffreferme.png"; // Réinitialiser l'image après avoir obtenu les points
  }
});
function playSound() {
  if (isSoundEnabled) {
    const audio = new Audio("capibara_song.mp3"); // Remplacez par le chemin de votre fichier audio
    audio.play();

    // Ajouter la classe d'animation au GIF
    const clickerImage = document.getElementById("clicker-image");
    clickerImage.classList.add("slide-in");

    // Supprimer la classe après l'animation pour permettre de la relancer
    clickerImage.addEventListener(
      "animationend",
      () => {
        clickerImage.classList.remove("slide-in");
      },
      { once: true }
    );
  }
}
function toggleShop() {
  const shopContainer = document.getElementById("shop-container");
  shopContainer.classList.toggle("visible");
}
document
  .getElementById("settings-button")
  .addEventListener("click", function () {
    document.getElementById("settings-popup").style.display = "block";
  });

document
  .getElementById("close-settings-button")
  .addEventListener("click", function () {
    document.getElementById("settings-popup").style.display = "none";
  });

document.getElementById("sound-toggle").addEventListener("change", function () {
  isSoundEnabled = this.checked;
  console.log("Sound is " + (isSoundEnabled ? "enabled" : "disabled"));
});

document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", function () {
    const cost = parseInt(button.getAttribute("data-cost"), 10);
    if (score >= cost) {
      score -= cost;
      if (button.getAttribute("data-type") === "time-reduction") {
        coffreTime -= 60; // Réduit le temps de 60 secondes (1 minute)
        updateCoffreTime();
      } else if (button.getAttribute("data-type") === "points-increase") {
        coffrePoints += 50; // Augmente les points de 50
        updateCoffrePoints();
      } else {
        autoClickers++;
      }
      updateScore();
      updateAutoClickers();
    } else {
      alert("Not enough points to buy this upgrade!");
    }
  });
});

function updateCoffreTime() {
  console.log("Coffre Time: " + coffreTime);
}

function updateCoffrePoints() {
  console.log("Coffre Points: " + coffrePoints);
}

function updateScore() {
  document.getElementById("score").innerText = score;
}

function updateAutoClickers() {
  console.log("Auto-Clickers: " + autoClickers);
}

function saveScore() {
  fetch("save_score.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: score,
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

// Appelle cette fonction quand tu veux sauvegarder le score
saveScore();

setInterval(function () {
  score += autoClickers;
  updateScore();
}, 1000);
function updateScore() {
  document.getElementById("score").innerText = score;
}

function updateTimer() {
  const minutes = Math.floor(coffreTime / 60);
  const seconds = coffreTime % 60;
  document.getElementById("timer").innerText = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
  if (coffreTime > 0) {
    coffreTime--;
  } else {
    score += coffrePoints;
    updateScore();
    document.getElementById("timer-image").src = "coffreOpen.png";
    setTimeout(() => {
      document.getElementById("timer-image").src = "coffreferme.png";
      coffreTime = 300; // Réinitialise le temps du coffre
    }, 2000); // Le coffre reste ouvert pendant 2 secondes
  }
}

timerInterval = setInterval(updateTimer, 1000);

timerInterval = setInterval(updateTimer, 1000);

timerInterval = setInterval(updateTimer, 1000);

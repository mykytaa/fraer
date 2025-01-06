const tapCoin = document.getElementById("tap-coin");
const counter = document.getElementById("counter");
const levelDisplay = document.getElementById("level");
const coinsDisplay = document.getElementById("coins");
const progressFill = document.getElementById("progress-fill");

let tapCount = 0;
let level = 1;
let coins = 0;
let tapsForNextLevel = 50;
let tapValue = 1;
let totalCoins = 0; // Общее количество монет

// Обработка клика на монету
tapCoin.addEventListener("click", () => {
  // Анимация монеты
  tapCoin.classList.add("coin-animate");
  setTimeout(() => tapCoin.classList.remove("coin-animate"), 500);

  // Увеличение монет
  coins += tapValue;
  totalCoins += tapValue; // Увеличиваем общее количество монет
  coinsDisplay.textContent = `Coins: ${totalCoins}`;

  // Проверка выполнения челленджа
  if (activeChallenge) {
    challengeProgress++;

    if (challengeProgress >= activeChallenge.tapsRequired) {
      clearInterval(challengeTimer);
      challengeTimer = null;

      // Обновляем статус челленджа
      coins += activeChallenge.reward;
      totalCoins += activeChallenge.reward; // Добавляем награду к общему количеству монет
      showNotification(`Challenge "${activeChallenge.name}" completed! You earned ${activeChallenge.reward} coins.`);

      const challengeIndex = challenges.findIndex(ch => ch.name === activeChallenge.name);
      if (challengeIndex !== -1) {
        challenges[challengeIndex].success = true;
        challenges[challengeIndex].cooldown = Date.now() + 24 * 60 * 60 * 1000; // 24 часа кулдаун
        challenges[challengeIndex].active = false;
      }

      activeChallenge = null;
      displayChallenges(); // Обновление интерфейса
    }
  }

  // Прогресс на уровень
  const progress = (coins % tapsForNextLevel) / tapsForNextLevel * 100;
  progressFill.style.width = `${progress}%`;

  if (coins >= tapsForNextLevel) {
    level++;
    coins -= tapsForNextLevel;
    tapsForNextLevel = Math.ceil(tapsForNextLevel * 1.5);
    levelDisplay.textContent = `Level: ${level}`;
    progressFill.style.width = "0%";
  }
});

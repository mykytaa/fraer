// Элементы вкладок
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Логика переключения вкладок
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabContents.forEach(content => (content.style.display = 'none'));
    const targetTab = button.dataset.tab;
    document.getElementById(targetTab).style.display = 'block';
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

// Убедиться, что вкладка Tap видна по умолчанию
document.querySelector('#tap-section').style.display = 'block';

// Логика для Tap
const tapCoin = document.getElementById("tap-coin");
const counter = document.getElementById("counter");
const levelDisplay = document.getElementById("level");
const coinsDisplay = document.getElementById("coins");
const progressFill = document.getElementById("progress-fill");

let tapCount = 0;
let level = 1;
let coins = 0;
let tapsForNextLevel = 50; // Стартовое количество тапов для перехода на следующий уровень
let tapValue = 1; // Сколько монет приносит один тап

// Обработка тапов
tapCoin.addEventListener("click", () => {
  tapCount++;
  coins += tapValue;
  counter.textContent = tapCount;
  coinsDisplay.textContent = `Coins: ${coins}`;

  // Рассчитываем прогресс
  const progress = (tapCount % tapsForNextLevel) / tapsForNextLevel * 100;
  progressFill.style.width = `${progress}%`;

  // Уровень увеличивается, если достигнуто нужное количество тапов
  if (tapCount >= tapsForNextLevel) {
    level++;
    tapCount = 0; // Сброс счетчика
    tapsForNextLevel = Math.ceil(tapsForNextLevel * 1.5); // Увеличиваем сложность
    levelDisplay.textContent = `Level: ${level}`;
    alert(`Level Up! Now you need ${tapsForNextLevel} taps to reach the next level.`);
    progressFill.style.width = "0%"; // Сброс прогресса
  }
});

// Логика для Challenges
const challenges = [
  { name: "Reach 50 taps in 20 seconds", tapsRequired: 50, time: 20, reward: 100, cooldown: null },
  { name: "Reach 100 taps in 30 seconds", tapsRequired: 100, time: 30, reward: 200, cooldown: null },
  { name: "Reach 200 taps in 40 seconds", tapsRequired: 200, time: 40, reward: 300, cooldown: null },
];

const challengeList = document.getElementById("challenge-list");
let activeChallenge = null;
let challengeTimer = null;

// Отображение челленджей
function displayChallenges() {
  challengeList.innerHTML = ""; // Очистка списка перед обновлением
  challenges.forEach((challenge, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${challenge.name}</p>
      <p>Reward: ${challenge.reward} Coins</p>
      <p id="cooldown-${index}" style="color: red;"></p>
    `;

    const button = document.createElement("button");
    button.textContent = challenge.cooldown ? "Unavailable" : "Start";
    button.disabled = !!challenge.cooldown;

    button.addEventListener("click", () => startChallenge(challenge, index));
    div.appendChild(button);
    challengeList.appendChild(div);

    // Если есть кулдаун, добавляем таймер
    if (challenge.cooldown) {
      updateCooldownTimer(challenge, index, button);
    }
  });
}

// Запуск челленджа
function startChallenge(challenge, index) {
  if (activeChallenge) {
    alert("Finish the current challenge first!");
    return;
  }

  activeChallenge = { ...challenge, progress: 0 };
  alert(`Challenge \"${challenge.name}\" started!`);

  if (challenge.time > 0) {
    let timeLeft = challenge.time;
    challengeTimer = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(challengeTimer);
        challengeTimer = null;

        if (activeChallenge.progress >= challenge.tapsRequired) {
          coins += challenge.reward;
          coinsDisplay.textContent = `Coins: ${coins}`;
          alert(`Challenge \"${challenge.name}\" completed! You earned ${challenge.reward} coins.`);
          challenges[index].cooldown = Date.now() + 24 * 60 * 60 * 1000; // Устанавливаем 24 часа
          displayChallenges(); // Обновление списка челленджей
        } else {
          alert(`Challenge \"${challenge.name}\" failed.`);
        }

        activeChallenge = null;
      }
    }, 1000);
  }
}

// Обновление таймера обратного отсчета
function updateCooldownTimer(challenge, index, button) {
  const cooldownElement = document.getElementById(`cooldown-${index}`);
  const interval = setInterval(() => {
    const timeLeft = Math.max(0, challenge.cooldown - Date.now());
    if (timeLeft <= 0) {
      clearInterval(interval);
      challenge.cooldown = null;
      button.textContent = "Start";
      button.disabled = false;
      cooldownElement.textContent = "";
    } else {
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      cooldownElement.textContent = `Available in: ${hours}h ${minutes}m ${seconds}s`;
    }
  }, 1000);
}

// Инициализация
displayChallenges();

// Магазин
const shopButtons = document.getElementById("shop-buttons");

shopButtons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id === "upgrade-tap" && coins >= 100) {
    coins -= 100;
    tapValue += 1;
    alert(`Tap value increased! Now each tap gives ${tapValue} coins.`);
    coinsDisplay.textContent = `Coins: ${coins}`;
  } else if (target.id === "buy-autotapper" && coins >= 500) {
    coins -= 500;
    alert("Autotapper purchased! You now automatically earn 1 coin every second.");
    setInterval(() => {
      coins += 1;
      coinsDisplay.textContent = `Coins: ${coins}`;
    }, 1000);
  } else if (target.id === "reduce-challenge-cost" && coins >= 300) {
    coins -= 300;
    challenges.forEach(challenge => (challenge.reward += 50));
    alert("Challenge rewards increased by 50 coins!");
    coinsDisplay.textContent = `Coins: ${coins}`;
  } else {
    alert("Not enough coins!");
  }
});

// Лидерборд
const leaderboardList = document.getElementById("leaderboard-list");
let leaderboard = [];

function updateLeaderboard() {
  leaderboard.push({ coins, level });
  leaderboard.sort((a, b) => b.coins - a.coins);
  leaderboardList.innerHTML = leaderboard
    .map(player => `<li>Level ${player.level}, Coins: ${player.coins}</li>`)
    .join("");
}
setInterval(updateLeaderboard, 10000); // Обновление каждые 10 секунд

// Сохранение игры
function saveGame() {
  localStorage.setItem("tapnad", JSON.stringify({ coins, level, tapCount }));
}

function loadGame() {
  const savedData = JSON.parse(localStorage.getItem("tapnad"));
  if (savedData) {
    coins = savedData.coins;
    level = savedData.level;
    tapCount = savedData.tapCount;
    coinsDisplay.textContent = `Coins: ${coins}`;
    levelDisplay.textContent = `Level: ${level}`;
    counter.textContent = tapCount;
  }
}

window.addEventListener("beforeunload", saveGame);
window.addEventListener("load", loadGame);

// Вкладка "Социальные задания"
const socialTasks = [
  { task: "Share this game on Twitter", reward: 50 },
  { task: "Invite a friend to play", reward: 100 },
  { task: "Post a screenshot on Instagram", reward: 150 },
];

const socialTaskList = document.getElementById("social-task-list");

function displaySocialTasks() {
  socialTaskList.innerHTML = "";
  socialTasks.forEach(task => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${task.task}</p>
      <button>Complete (Reward: ${task.reward} Coins)</button>
    `;
    div.querySelector("button").addEventListener("click", () => {
      coins += task.reward;
      coinsDisplay.textContent = `Coins: ${coins}`;
      alert(`Task completed! You earned ${task.reward} coins.`);
    });
    socialTaskList.appendChild(div);
  });
}

displaySocialTasks();

// Список челленджей
const challenges = [
    { name: "Reach 50 taps in 10 seconds", tapsRequired: 50, time: 10, reward: 100, active: false, cooldown: null, success: null },
    { name: "Reach 100 taps in 20 seconds", tapsRequired: 100, time: 20, reward: 200, active: false, cooldown: null, success: null },
    { name: "Reach 200 taps in 30 seconds", tapsRequired: 200, time: 30, reward: 500, active: false, cooldown: null, success: null },
  ];
  
  let activeChallenge = null;
  let challengeProgress = 0;
  let challengeTimer = null;
  
  // Функция отображения списка челленджей
  function displayChallenges() {
    const challengeList = document.getElementById("challenge-list");
    if (!challengeList) {
      console.error("Challenge list element not found!");
      return;
    }
  
    challengeList.innerHTML = ""; // Очистка списка перед обновлением
  
    challenges.forEach((challenge, index) => {
      const now = Date.now();
      let cooldownText = "";
      let buttonDisabled = false;
  
      // Проверяем кулдаун
      if (challenge.cooldown && challenge.cooldown > now) {
        const timeLeft = challenge.cooldown - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        cooldownText = `Available in: ${hours}h ${minutes}m ${seconds}s`;
        buttonDisabled = true;
  
        // Обновляем каждую секунду
        setTimeout(displayChallenges, 1000);
      }
  
      // Создание карточки челленджа
      const div = document.createElement("div");
      div.classList.add("challenge-card");
      div.innerHTML = `
        <h3>${challenge.name}</h3>
        <p>Reward: <strong>${challenge.reward} Coins</strong></p>
        <p class="status ${challenge.success === null ? 'not-started' : challenge.success ? 'completed' : 'failed'}">
          ${challenge.success === null ? "Not Started" : challenge.success ? "Completed" : "Failed"}
        </p>
        <p style="color: yellow;">${cooldownText}</p>
        <button ${buttonDisabled ? "disabled" : ""}>
          ${challenge.active ? "In Progress" : buttonDisabled ? "Cooldown" : "Start"}
        </button>
      `;
  
      // Добавление обработчика кнопки
      const button = div.querySelector("button");
      button.addEventListener("click", () => startChallenge(challenge, index));
  
      challengeList.appendChild(div);
    });
  }
  
  // Функция запуска челленджа
  function startChallenge(challenge, index) {
    if (activeChallenge) {
      showNotification("Complete the current challenge first!");
      return;
    }
  
    if (challenge.cooldown && challenge.cooldown > Date.now()) {
      showNotification("Challenge is on cooldown!");
      return;
    }
  
    activeChallenge = challenge;
    challengeProgress = 0;
  
    showNotification(`Challenge "${challenge.name}" started!`);
    challenge.active = true;
  
    console.log(`Challenge "${challenge.name}" started!`);
  
    // Запускаем таймер челленджа
    let timeLeft = challenge.time;
    challengeTimer = setInterval(() => {
      timeLeft--;
      console.log(`Time left: ${timeLeft}s`);
  
      if (timeLeft <= 0) {
        clearInterval(challengeTimer);
        challengeTimer = null;
  
        // Проверяем успешность выполнения челленджа
        if (challengeProgress >= challenge.tapsRequired) {
          coins += challenge.reward;
          showNotification(`Challenge "${challenge.name}" completed! You earned ${challenge.reward} coins.`);
          challenges[index].success = true; // Устанавливаем статус "Completed"
          challenges[index].cooldown = Date.now() + 24 * 60 * 60 * 1000; // 24 часа кулдаун
          console.log(`Challenge "${challenge.name}" marked as Completed.`);
        } else {
          showNotification(`Challenge "${challenge.name}" failed. Try again in 1 hour.`);
          challenges[index].success = false; // Устанавливаем статус "Failed"
          challenges[index].cooldown = Date.now() + 60 * 60 * 1000; // 1 час кулдаун
          console.log(`Challenge "${challenge.name}" marked as Failed.`);
        }
  
        // Обновляем состояние челленджа
        challenges[index].active = false;
        activeChallenge = null;
  
        // Принудительно обновляем интерфейс
        displayChallenges();
      }
    }, 1000);
  
    displayChallenges(); // Обновление отображения при старте челленджа
  }
  
  // Функция уведомления
  function showNotification(message) {
    const notificationArea = document.getElementById("notification-area");
    if (!notificationArea) {
      console.error("Notification area element not found!");
      return;
    }
  
    notificationArea.textContent = message;
    notificationArea.classList.add("show");
  
    setTimeout(() => {
      notificationArea.classList.remove("show");
    }, 3000);
  }
  
  // Инициализация списка челленджей
  displayChallenges();
  
// Элемент списка лидерборда
const leaderboardList = document.getElementById("leaderboard-list");
let leaderboard = [];

// Предполагаемый объект пользователей (заглушка)
const users = {
  "examplePublicKey1": "Player1",
  "examplePublicKey2": "Player2"
};

// Функция обновления лидерборда
function updateLeaderboard() {
  const currentUser = {
    nickname: connectedWallet ? users[connectedWallet] || "Guest" : "Guest",
    level,
    coins,
    referrals: getReferralCount(),
  };

  const existingPlayer = leaderboard.find(player => player.nickname === currentUser.nickname);
  if (existingPlayer) {
    existingPlayer.level = currentUser.level;
    existingPlayer.coins = currentUser.coins;
    existingPlayer.referrals = currentUser.referrals;
  } else {
    leaderboard.push(currentUser);
  }

  leaderboard.sort((a, b) => b.coins - a.coins);

  leaderboardList.innerHTML = `
    <div class="leaderboard-wrapper">
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Nickname</th>
            <th>Coins</th>
            <th>Level</th>
            <th>Referrals</th>
          </tr>
        </thead>
        <tbody>
          ${leaderboard.map((player, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${player.nickname}</td>
              <td>${player.coins}</td>
              <td>${player.level}</td>
              <td>${player.referrals}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// Функция подсчёта рефералов (заглушка)
function getReferralCount() {
  return Math.floor(Math.random() * 10);
}

// Стиль для таблицы лидерборда
const style = document.createElement("style");
style.textContent = `
  .leaderboard-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin-left: -20px; /* Сдвиг влево */
  }

  .leaderboard-table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
    color: #FFF;
    font-size: 14px;
    text-align: center;
    background: rgba(58, 30, 97, 0.8);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6);
  }

  .leaderboard-table th, .leaderboard-table td {
    padding: 10px;
    border: 1px solid #6a0dad;
  }

  .leaderboard-table th {
    background-color: #7A0BC0;
    color: #FFD700;
    font-weight: bold;
  }

  .leaderboard-table tr:nth-child(even) {
    background-color: rgba(75, 0, 130, 0.7);
  }

  .leaderboard-table tr:nth-child(odd) {
    background-color: rgba(75, 0, 130, 0.9);
  }

  .leaderboard-table tr:hover {
    background-color: #531091;
    color: #FFF;
  }

  @media screen and (max-width: 768px) {
    .leaderboard-wrapper {
      margin-left: -10px; /* Меньший сдвиг на маленьких экранах */
    }

    .leaderboard-table {
      font-size: 12px;
    }

    .leaderboard-table th, .leaderboard-table td {
      padding: 8px;
    }
  }
`;
document.head.appendChild(style);

// Обновляем лидерборд каждые 10 секунд
setInterval(updateLeaderboard, 10000);

// Выполняем обновление сразу при загрузке страницы
updateLeaderboard();
  
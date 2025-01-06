document.addEventListener("DOMContentLoaded", () => {
  const shopButtons = document.getElementById("shop-buttons");

  if (!shopButtons) {
    console.error("Shop container with ID 'shop-buttons' not found!");
    return;
  }

  // Массив товаров магазина с удорожанием
  const shopItems = [
    {
      id: "upgrade-tap",
      name: "Upgrade Tap",
      description: "Increase tap value by 1.",
      cost: 100,
      icon: "assets/icons/upgrade-tap.png",
      multiplier: 2,
    },
    {
      id: "buy-autotapper",
      name: "Autotapper",
      description: "Automatically earn 1 coin per second.",
      cost: 500,
      icon: "assets/icons/autotapper.png",
      multiplier: 2,
    },
    {
      id: "super-challenge-boost",
      name: "Challenge Boost",
      description: "Boost rewards by 100 coins, but make challenges harder.",
      cost: 600,
      icon: "assets/icons/chal.png",
      multiplier: 2.5,
    },
    {
      id: "time-freeze",
      name: "Time Freeze",
      description: "Freeze the timer for 10 seconds in challenges.",
      cost: 800,
      icon: "assets/icons/ice.png",
      multiplier: 2.5,
    },
  ];

  let coins = 1000; // Стартовое количество монет

  function displayShop() {
    shopButtons.innerHTML = ""; // Очищаем контейнер

    shopItems.forEach((item) => {
      const shopItem = document.createElement("div");
      shopItem.className = "shop-card";
      shopItem.innerHTML = `
        <div class="shop-card-content">
          <img src="${item.icon}" alt="${item.name}" class="shop-card-icon" />
          <h2 class="shop-card-title">${item.name}</h2>
          <p class="shop-card-description">${item.description}</p>
          <p class="shop-card-cost">Cost: ${item.cost} Coins</p>
          <button id="${item.id}" class="shop-card-button" ${coins < item.cost ? "disabled" : ""}>Buy</button>
        </div>
      `;
      shopButtons.appendChild(shopItem);
    });

    attachShopListeners();
  }

  function attachShopListeners() {
    shopItems.forEach((item) => {
      const button = document.getElementById(item.id);
      if (button) {
        button.addEventListener("click", () => {
          if (coins >= item.cost) {
            coins -= item.cost;
            document.getElementById("coins").textContent = `Coins: ${coins}`;

            // Удорожание товара
            item.cost = Math.round(item.cost * item.multiplier);

            alert(`🎉 You successfully purchased: ${item.name}!`);
            displayShop(); // Перерисовываем магазин с обновленными ценами
          } else {
            alert("🚫 Not enough coins!");
          }
        });
      }
    });
  }

  displayShop(); // Инициализация магазина

  // Обновление количества монет
  function updateCoinsDisplay() {
    const coinsDisplay = document.getElementById("coins");
    if (coinsDisplay) {
      coinsDisplay.textContent = `💰 Coins: ${coins}`;
    }
  }

  updateCoinsDisplay();
});

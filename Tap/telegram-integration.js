// Проверяем наличие объекта Telegram Web App
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
  
    // Уведомляем Telegram, что приложение готово
    tg.ready();
  
    // Устанавливаем цвета приложения из параметров Telegram
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
    document.body.style.color = tg.themeParams.text_color || '#000000';
  
    // Настройка событий
    console.log("Telegram WebApp initialized");
  
    // Отправка данных в бот
    const sendDataToBot = (action, data) => {
      if (tg.sendData) {
        tg.sendData(JSON.stringify({ action, data }));
      } else {
        console.error("Telegram WebApp API not available");
      }
    };
  
    // Пример отправки данных при нажатии на кнопку
    const tapButton = document.getElementById('tap-coin');
    tapButton.addEventListener('click', () => {
      sendDataToBot('tap', { coins: coins, taps: tapCount });
    });
  
    // Добавляем кнопку закрытия приложения
    const closeAppButton = document.createElement('button');
    closeAppButton.innerText = "Close App";
    closeAppButton.style.position = 'absolute';
    closeAppButton.style.bottom = '20px';
    closeAppButton.style.right = '20px';
    closeAppButton.style.padding = '10px 20px';
    closeAppButton.style.backgroundColor = '#FF6347';
    closeAppButton.style.color = '#fff';
    closeAppButton.style.border = 'none';
    closeAppButton.style.borderRadius = '5px';
    closeAppButton.style.cursor = 'pointer';
  
    closeAppButton.addEventListener('click', () => {
      tg.close();
    });
  
    document.body.appendChild(closeAppButton);
  } else {
    console.error("Telegram WebApp API not found");
  }
  
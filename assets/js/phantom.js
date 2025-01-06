let connectedWallet = null;

// Подключение кошелька Phantom
async function connectPhantomWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            connectedWallet = response.publicKey.toString();
            console.log("Connected Wallet:", connectedWallet);

            // Сохраняем адрес кошелька в локальное хранилище
            localStorage.setItem('connectedWallet', connectedWallet);

            // Проверяем, зарегистрирован ли никнейм
            const existingNickname = localStorage.getItem('userNickname');
            if (!existingNickname) {
                openModal(); // Открытие модального окна для выбора никнейма
            } else {
                updateNicknameDisplay(existingNickname); // Отображаем ник на кнопке
            }
        } catch (err) {
            console.error("Error connecting to Phantom Wallet:", err);
            alert("Failed to connect to Phantom Wallet.");
        }
    } else {
        alert("Phantom Wallet is not installed. Please install it and try again.");
    }
}

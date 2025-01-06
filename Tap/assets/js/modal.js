// Открытие модального окна
function openModal() {
    const modal = document.getElementById('nickname-modal');
    modal.classList.remove('hidden');
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('nickname-modal');
    modal.classList.add('hidden');
}

// Сохранение никнейма
function confirmNickname() {
    const nicknameInput = document.getElementById('nickname-input');
    const nickname = nicknameInput.value.trim();

    if (!nickname) {
        alert("Please enter a valid nickname.");
        return;
    }

    // Проверка, занят ли никнейм
    if (isNicknameTaken(nickname)) {
        alert("This nickname is already taken. Please choose another one.");
        return;
    }

    // Сохраняем никнейм
    localStorage.setItem('userNickname', nickname);
    saveNicknameToList(nickname);
    updateNicknameDisplay(nickname);
    closeModal();
}

// Проверка, занят ли никнейм
function isNicknameTaken(nickname) {
    const storedNicknames = JSON.parse(localStorage.getItem('nicknames') || "[]");
    return storedNicknames.includes(nickname);
}

// Добавление никнейма в список
function saveNicknameToList(nickname) {
    let storedNicknames = JSON.parse(localStorage.getItem('nicknames') || "[]");
    storedNicknames.push(nickname);
    localStorage.setItem('nicknames', JSON.stringify(storedNicknames));
}

// Обновление отображения никнейма
function updateNicknameDisplay(nickname) {
    const connectButton = document.getElementById('connect-wallet-button');
    connectButton.textContent = nickname;
}

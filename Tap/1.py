from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackContext

# Замените токен на токен вашего бота, выданный BotFather
BOT_TOKEN = '7451847396:AAEyGhKl1mXe44vMQvt_F5XcQsQa8H5KsxI'
APP_URL = 'https://mykytaa.github.io/Tapnad/'  # URL вашего приложения

# Функция для обработки команды /start
async def start(update, context: CallbackContext) -> None:
    # Клавиатура с кнопкой для мини-приложения
    keyboard = [
        [
            InlineKeyboardButton("Играть в Tap Game", web_app={'url': APP_URL}),
        ]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Отправляем сообщение с кнопкой
    await update.message.reply_text(
        "Нажмите кнопку ниже, чтобы начать игру:",
        reply_markup=reply_markup
    )

# Основная функция запуска бота
def main() -> None:
    # Создаем экземпляр Application
    application = Application.builder().token(BOT_TOKEN).build()

    # Добавляем обработчик команды /start
    application.add_handler(CommandHandler("start", start))

    # Запускаем бота
    print("Бот запущен. Нажмите Ctrl+C для остановки.")
    application.run_polling()

if __name__ == '__main__':
    main()

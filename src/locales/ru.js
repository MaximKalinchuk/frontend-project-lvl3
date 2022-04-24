import i18next from 'i18next';

i18next.init({
  // конфигурация i18next
  lng: 'ru', // Текущий язык
  debug: true,
  resources: {
    ru: { // Тексты конкретного языка
      translation: { // Так называемый namespace по умолчанию
        validError: 'Ссылка должна быть валидным URL',
        linkAlreadyExists: 'RSS уже существует',
        add: 'RSS добавлен!',
      },
    },
  },
});

// Где-то в коде приложения обращаемся к ключу (key)

export default i18next;

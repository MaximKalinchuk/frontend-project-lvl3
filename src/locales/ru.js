import i18next from 'i18next';

i18next.init({
  // конфигурация i18next
  lng: 'ru', // Текущий язык
  debug: true,
  resources: {
    ru: { // Тексты конкретного языка
      translation: {
        errors: {
          url: 'Ссылка должна быть валидным URL',
          notOneOf: 'RSS уже существует',
          invalidRSS: 'Ресурс не содержит валидный RSS',
        },
        add: 'RSS добавлен!',
      },
    },
  },
});

// Где-то в коде приложения обращаемся к ключу (key)

export default i18next;

import i18next from './locales/ru.js';
// Рендер
const render = (params) => {
  const feedback = document.querySelector('.feedback');
  const input = document.querySelector('input');
  if (params.errors) {
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = i18next.t('validError');
    return;
  }

  if (params.haveLink) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
    feedback.textContent = i18next.t('linkAlreadyExists');
  }
  if (!params.haveLink) {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    feedback.textContent = i18next.t('add');
  }
};
export default render;

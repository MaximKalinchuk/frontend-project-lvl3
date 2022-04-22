// Рендер
const render = (params) => {
  const feedback = document.querySelector('.feedback');
  const input = document.querySelector('input');
  if (params.errors) {
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
    return;
  }

  if (params.haveLink) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
    feedback.textContent = 'RSS уже существует';
  }
  if (!params.haveLink) {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    feedback.textContent = 'RSS добавлен!';
  }
};

export default render;

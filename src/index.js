// import valid from './View.js';
import { object, string } from 'yup';
import './style.css';

// Состояние
const state = {
  links: [],
  haveLink: false,
  errors: false,
};

// Рендер, после добавления новой ссылки
const render = (state1) => {
  const feedback = document.querySelector('.feedback');
  const input = document.querySelector('input');
  if (state1.errors) {
    console.log('hey!');
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');

    feedback.textContent = 'Ссылка должна быть валидным URL';
    state.errors = false;
    return;
  }

  if (state1.haveLink) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
    feedback.textContent = 'RSS уже существует';
  }
  if (!state1.haveLink) {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    feedback.textContent = 'RSS добавлен!';
  }
};

// Валидатор
const valid = async (url) => {
  const userSchema = object({ url: string().url().nullable() });

  try {
    const parsedUrl = await userSchema.validate(url);

    if (state.links.includes(parsedUrl.url)) {
      state.haveLink = true;
      render(state);
    }

    if (!state.links.includes(parsedUrl.url)) {
      state.links.push(parsedUrl.url);
      state.haveLink = false;
      render(state);
    }
  } catch (error) {
    state.errors = true;
    render(state);
  }

  console.log(state);
};

// Обработчики
const form = document.querySelector('.rss-form');
const textContent = form.querySelector('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const value = Object.fromEntries(formData);
  valid(value);

  textContent.focus();
  form.reset();
});

import './style.css';
// import onChange from 'on-change';
import validate from './valid.js';
// import parser from './parser.js';
import render from './View';

const state = {
  links: [],
  errors: false,
};

// onChange(state, render(state));
// Обработчики
const form = document.querySelector('.rss-form');
const textContent = form.querySelector('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const value = Object.fromEntries(formData);

  const validateResult = validate(value);
  // получаем список ошибок, если ошибки есть = добавляем их в state. Если ошибок нет
  render(value, validateResult, state);

  console.log(state);
  textContent.focus();
  form.reset();
});

// https://aussiedlerbote.de/rss;

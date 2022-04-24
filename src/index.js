import './style.css';
import valid from './valid.js';

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

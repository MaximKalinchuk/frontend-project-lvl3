import axios from 'axios';
import 'bootstrap';
import './style.css';
import _ from 'lodash';
import onChange from 'on-change';
import validate from './valid.js';
import parser from './parser.js';
import render from './View';

const state = {
  url: '',
  links: [],
  feeds: [],
  posts: [],
  uiState: {
    postChecked: new Set(),
  },
  form: {
    error: null,
    valid: true,
  },
};

const watchedState = onChange(state, () => {
  render(state);
});

// const localUrl = 'http://localhost:1458/get?disableCache=true&url=';
const allOriginsUrl = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
// Функция повторного запроса.
const updatePosts = (url) => {
  setTimeout(() => {
    axios.get(`${allOriginsUrl}${encodeURIComponent(url)}`)
      .then((response) => {
        if (response.status === 200) return response.data;
        throw new Error('Network response was not ok.');
      }).then((response) => {
        const data = parser(response);
        const itemsList = Array.from(data.querySelectorAll('item'));
        // console.log(itemsList);
        const postsList = itemsList.reduce((acc, item) => {
          const title = item.querySelector('title').textContent;
          const description = item.querySelector('description').textContent;
          const link = item.querySelector('link').textContent;
          const id = _.uniqueId();
          // console.log('title', title);
          const obj = {
            title, description, link, id,
          };
          const repeatPost = watchedState.posts.filter((post) => post.title === title);
          // console.log(repeatPost.length);
          if (repeatPost.length === 0) {
            acc.push(obj);
          }
          return acc;
        }, []);
        // console.log('P!!!!');
        watchedState.posts = [...postsList, ...watchedState.posts];
        updatePosts(url);
        const postsElement = document.querySelector('body');
        postsElement.addEventListener('click', (e) => {
          if (e.target.dataset.id) {
            watchedState.uiState.postChecked.add(e.target.dataset.id);
          }
          // console.log(e.target.dataset.id);
          // console.log('Я отработал!');
        });
      })
      .catch((error) => {
        console.log(error); // Обработать!
      });
  }, 5000);
};
// https://lorem-rss.herokuapp.com/feed?unit=second&interval=5

// Обработчики
const form = document.querySelector('.rss-form');
const textContent = form.querySelector('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const value = Object.fromEntries(formData);
  state.url = value.url;

  const error = validate(value.url, state.links);
  error.then((errorData) => {
    // console.log('errorData', errorData);
    if (errorData) {
      watchedState.form.error = errorData;
      console.log(watchedState.form.error);
      watchedState.form.valid = false;
    } else {
      watchedState.form.error = null;
      watchedState.form.valid = true;
      watchedState.links.push(state.url);
    }
  }).then(() => {
    if (state.form.valid) {
      axios.get(`${allOriginsUrl}${encodeURIComponent(value.url)}`)
        .then((response) => {
          // console.log('response', response);
          if (response.status === 200) {
            return response.data;
          }
          throw new Error('Network response was not ok.');
        })
        .then((response) => {
          const data = parser(response);
          const feedTitle = data.querySelector('channel title').textContent;
          const feedDescription = data.querySelector('channel description').textContent;
          watchedState.feeds.unshift({
            feedTitle, feedDescription,
          });

          const itemsList = Array.from(data.querySelectorAll('item'));
          // в массив объектов map
          const postsList = itemsList.reduce((acc, item) => {
            const title = item.querySelector('title').textContent;
            const description = item.querySelector('description').textContent;
            const link = item.querySelector('link').textContent;
            const id = _.uniqueId();
            acc.push({
              title, description, link, id,
            });
            return acc;
          }, []);
          watchedState.posts = [...postsList, ...watchedState.posts];
          updatePosts(value.url);

          // изменение состояния постов (промотренно/ не просмотренно)
          const postsElement = document.querySelector('body');
          postsElement.addEventListener('click', (e) => {
            if (e.target.dataset.id) {
              watchedState.uiState.postChecked.add(e.target.dataset.id);
            }
            // console.log(e.target.dataset.id);
            // console.log('Я отработал!');
          });
        });
    }
    // получаем список ошибок, если ошибки есть = добавляем их в state. Если ошибок нет
    console.log('STATE', state);
    textContent.focus();
    form.reset();
  });
  // console.log('error', error);

  // делаем запрос и добавляем данные в state
});

// https://aussiedlerbote.de/rss

// https://lorem-rss.herokuapp.com/feed?unit=second&interval=5

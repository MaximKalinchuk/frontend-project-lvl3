import i18next from './locales/ru.js';

export default (state) => {
  // console.log(state.posts);
  // отображение валидации
  const feedback = document.querySelector('.feedback');
  const input = document.querySelector('input');

  if (state.form.valid === true) {
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    input.classList.remove('is-invalid');
    feedback.textContent = i18next.t('add');
  }
  if (state.form.error !== null) {
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    input.classList.add('is-invalid');
    feedback.textContent = i18next.t(`errors.${state.form.error}`);
  }
  // // запрос через api
  // data.then((doc) => {

  if (state.form.valid) {
    //   // Создание фидов
    const feeds = document.querySelector('.feeds');

    feeds.innerHTML = `<div class="card border-0"><div class="card-body">
  <h2 class="card-title h4">Фиды</h2></div>
    <ul class="list-group border-0 rounded-0"></ul></div>`;
    state.feeds.forEach((feed) => {
      const { feedTitle, feedDescription } = feed;

      const listFeedsGroup = feeds.querySelector('.list-group');
      const liFeedElement = document.createElement('li');
      liFeedElement.classList.add('list-group-item');
      liFeedElement.classList.add('border-0');
      liFeedElement.classList.add('border-end-0');

      const h3 = document.createElement('h3');
      h3.classList.add('h6');
      h3.classList.add('m-0');
      h3.textContent = feedTitle;

      const p = document.createElement('p');
      p.classList.add('m-0');
      p.classList.add('small');
      p.classList.add('text-black-50');
      p.textContent = feedDescription;

      liFeedElement.append(h3);
      liFeedElement.append(p);
      listFeedsGroup.append(liFeedElement);
    });

    // Создание постов

    const posts = document.querySelector('.posts');
    posts.innerHTML = `<div class="card border-0"><div class="card-body">
    <h2 class="card-title h4">Посты</h2></div>
    <ul class="list-group border-0 rounded-0"></ul></div>`;
    const listGroup = document.querySelector('.list-group');
    state.posts.forEach((post) => {
      const {
        title, description, link, id,
      } = post;
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.classList.add('d-flex');
      li.classList.add('justify-content-between');
      li.classList.add('align-items-start');
      li.classList.add('border-0');
      li.classList.add('border-end-0');

      const a = document.createElement('a');
      a.setAttribute('href', link);

      const { postChecked } = state.uiState;
      // console.log('postChecked', postChecked);
      // console.log(id);
      // console.log(state.uiState.postChecked)
      if (postChecked.has(id)) {
        a.classList.add('fw-normal');
      } else {
        a.classList.add('fw-bold');
      }

      a.setAttribute('data-id', id);
      a.setAttribute('target', 'blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = title;

      const button = document.createElement('button');
      button.classList.add('btn');
      button.classList.add('btn-outline-primary');
      button.classList.add('btn-sm');
      button.setAttribute('data-id', id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = 'Просмотр';

      li.append(a);
      li.append(button);
      listGroup.append(li);
      // Вешаем обработчик на кнопки
      button.addEventListener('click', () => {
        // врубаем модальное окно
        const modal = document.querySelector('.modal');
        const modalTitle = modal.querySelector('.modal-title');
        modalTitle.textContent = title;

        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `<p>${description}</p>`;

        const modalFooter = modal.querySelector('.modal-footer');
        const href = modalFooter.querySelector('a');
        href.removeAttribute('href');
        href.setAttribute('href', link);
      });
    });
  }
};

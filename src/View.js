import i18next from './locales/ru.js';

export default (state) => {
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
    let dataId = 1;
    state.posts.forEach((post) => {
      const { title, description, link } = post;
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.classList.add('d-flex');
      li.classList.add('justify-content-between');
      li.classList.add('align-items-start');
      li.classList.add('border-0');
      li.classList.add('border-end-0');

      const a = document.createElement('a');
      a.setAttribute('href', link);
      a.classList.add('fw-bold');
      a.setAttribute('data-id', dataId);
      a.setAttribute('target', 'blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = title;

      const button = document.createElement('button');
      button.classList.add('btn');
      button.classList.add('btn-outline-primary');
      button.classList.add('btn-sm');
      button.setAttribute('data-id', dataId); // ????
      dataId += 1;
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

        // modal.classList.add('show');
        // modal.setAttribute('style', 'display: block;');
        // modal.removeAttribute('aria-hidden');
        // modal.setAttribute('aria-modal', 'true');

        const modalFooter = modal.querySelector('.modal-footer');
        const href = modalFooter.querySelector('a');
        href.removeAttribute('href');
        href.setAttribute('href', link);

        // меняем задний фон
        // const body = document.querySelector('body');
        // body.setAttribute('style', 'overflow: hidden;');
        // const divModalBackdrop = document.createElement('div');
        // divModalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        // body.append(divModalBackdrop);

        // вырубаем модальное окно
        // const close = Array.from(modal.querySelectorAll('[data-bs-dismiss="modal"]'));
        // console.log(close);
        // close.forEach((item) => {
        //   item.addEventListener('click', () => {
        //     body.removeAttribute('style');
        //     modal.classList.remove('show');
        //     modal.setAttribute('style', 'display: none;');
        //     modal.removeAttribute('aria-modal');
        //     modal.setAttribute('aria-hidden', 'true');
        //     modalBody.innerHTML = '';
        //     // body.removeChild(divModalBackdrop);
        //   });
        // });
        console.log(modal);
      });
    });
  }
};

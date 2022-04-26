export default (value) => {
  fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(value.url)}`)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error('Network response was not ok.');
    })
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'application/xml');
      console.log(doc);
      return doc;
    })
    .then((doc) => {
      // Создание фидов
      const feedTitleContent = doc.querySelector('channel title').textContent;
      const feedDescriptionContent = doc.querySelector('channel description').textContent;
      const feeds = document.querySelector('.feeds');

      feeds.innerHTML = `<div class="card border-0"><div class="card-body"><h2 class="card-title h4">Фиды</h2></div>
    <ul class="list-group border-0 rounded-0"></ul></div>`;

      const listFeedsGroup = feeds.querySelector('.list-group');
      const liFeedElement = document.createElement('li');
      liFeedElement.classList.add('list-group-item');
      liFeedElement.classList.add('border-0');
      liFeedElement.classList.add('border-end-0');

      const h3 = document.createElement('h3');
      h3.classList.add('h6');
      h3.classList.add('m-0');
      h3.textContent = feedTitleContent;

      const p = document.createElement('p');
      p.classList.add('m-0');
      p.classList.add('small');
      p.classList.add('text-black-50');
      p.textContent = feedDescriptionContent;

      liFeedElement.append(h3);
      liFeedElement.append(p);
      listFeedsGroup.append(liFeedElement);

      // Создание постов
      const posts = document.querySelector('.posts');
      posts.innerHTML = `<div class="card border-0"><div class="card-body"><h2 class="card-title h4">Посты</h2></div>
      <ul class="list-group border-0 rounded-0"></ul></div>`;
      const listGroup = document.querySelector('.list-group');

      const itemsList = doc.querySelectorAll('item');
      let dataId = 1;
      itemsList.forEach((item) => {
        const title = item.querySelector('title').textContent;
        // const description = item.querySelector('description').textContent;
        const link = item.querySelector('link').textContent;

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
        // console.log(title, description, link);
        // console.log(item);
      });
    //   console.log('items', itemsList);
    });
};

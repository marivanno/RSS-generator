/* eslint-disable no-console */
import onChange from 'on-change';
import 'bootstrap/js/src/modal';

const elColMd10 = document.querySelector('.col-md-10');
const elInput = document.querySelector('input');
const elContent = document.querySelector('.flex-grow-1');

const stausLinkGenerator = (status) => {
  const feedback = document.createElement('div');
  if (document.querySelector('.feedback') !== null) {
    elInput.classList.remove('is-invalid');
    document.querySelector('.feedback').remove();
  }
  if (status === 'addingposts') {
    feedback.classList.add('feedback', 'text-success', 'text-sucsess');
    feedback.textContent = 'RSS успешно загружен';
  }
  if (status === 'linkIsNotValid') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = 'Ссылка должна быть валидным URL';
    elInput.classList.add('is-invalid');
  }

  if (status === 'dataIsWrong') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = 'С Вашими данными по ссылке что-то не так =( попробуйте другую ссылку';
    elInput.classList.add('is-invalid');
  }

  if (status === 'rssAlradyExist') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = 'RSS уже существует';
    elInput.classList.add('is-invalid');
  }

  return feedback;
};

const showModalWindow = (item) => () => {
  document.querySelector('.modal-title').textContent = `${item.title}`;
  document.querySelector('.modal-body').textContent = `${item.description}`;
  document.querySelector('.full-article').setAttribute('href', `${item.link}`);
};

const buildElPost = (item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
  const template = `<a href="${item.link}" class="font-weight-bold" data-id="35" target="_blank" rel="noopener noreferrer">${item.title}</a>
  <button type="button" class="btn btn-primary btn-sm" data-id="35" data-toggle="modal" data-target="#modal">Просмотр</button>`;
  li.innerHTML = template;
  li.querySelector('button').addEventListener('click', showModalWindow(item));
  return li;
};

const buildElFeeds = (item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  const tamplate = `
       <h3>${item.title}</h3>
       <p>${item.description}</p>`;
  li.innerHTML = tamplate;
  return li;
};

const addAllPosts = (item) => item.posts.map(buildElPost);

const addAllFeeds = (item) => item.feeds.map(buildElFeeds);

const buildContentFrame = () => {
  const elSection = document.createElement('section');
  elSection.classList.add('container-fluid', 'p-5');
  elSection.id = 'content';
  const tamplate = `
    <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto feeds">
          <h2>Фиды</h2>
          <ul class="list-group mb-5"></ul>
      </div>
    </div>
    <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto posts">
        <h2>Посты</h2>
        <ul class="list-group"></ul>
      </div>
    </div>`;
  elSection.innerHTML = tamplate;
  return elSection;
};


export default (state) => onChange(state, (path, value) => {
  switch (value) {
    case 'hendlingGettedData':
      console.log('waiting');
      break;
    case 'rssAlradyExist':
      elColMd10.appendChild(stausLinkGenerator('rssAlradyExist'));
      break;
    case 'addingposts':
      elColMd10.appendChild(stausLinkGenerator('addingposts'));
      document.querySelector('#content').remove();
      elContent.appendChild(buildContentFrame());
      document.querySelector('.feeds').querySelector('ul').append(...addAllFeeds(state));
      document.querySelector('.posts').querySelector('ul').append(...addAllPosts(state));
      break;
    case 'dataIsWrong':
      elColMd10.appendChild(stausLinkGenerator('dataIsWrong'));
      break;
    // case 'finished':
    case 'linkIsNotValid':
      elColMd10.appendChild(stausLinkGenerator('linkIsNotValid'));
      break;
    default:
      break;
  }
});

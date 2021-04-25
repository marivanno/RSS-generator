/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import onChange from 'on-change';
import 'bootstrap/js/src/modal';
import i18n from 'i18next';

const elColMd10 = document.querySelector('.col-md-10');
const elInput = document.querySelector('input');
const elContent = document.querySelector('.flex-grow-1');

const makeButtonActive = () => document.querySelector('[type="submit"]').disabled = false;

const blockButton = () => document.querySelector('[type="submit"]').disabled = true;

const stausLinkGenerator = (status) => {
  const feedback = document.createElement('div');
  if (document.querySelector('.feedback') !== null) {
    elInput.classList.remove('is-invalid');
    document.querySelector('.feedback').remove();
  }
  if (status === 'addingposts') {
    feedback.classList.add('feedback', 'text-success', 'text-sucsess');
    feedback.textContent = i18n.t('dataSuccessLoaded');
  } else if (status === 'linkIsNotValid') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = i18n.t('linkMustBeValid');
    elInput.classList.add('is-invalid');
  } else if (status === 'dataIsWrong') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = i18n.t('dataMustBeRss');
    elInput.classList.add('is-invalid');
  } else if (status === 'rssAlradyExist') {
    feedback.classList.add('feedback', 'text-success', 'text-danger');
    feedback.textContent = i18n.t('rssAlreadyExist');
    elInput.classList.add('is-invalid');
  }

  return feedback;
};

const showModalWindow = (item) => (e) => {
  e.target.previousElementSibling.classList.remove('font-weight-bold');
  e.target.previousElementSibling.classList.add('font-weight-normal');
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

const buildElFeed = (item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  const tamplate = `
       <h3>${item.title}</h3>
       <p>${item.description}</p>`;
  li.innerHTML = tamplate;
  return li;
};

const addAllPosts = (posts) => posts.map(buildElPost);

const addNewPosts = (tmpNewPosts) => tmpNewPosts.map(buildElPost);

const addAllFeeds = (feeds) => feeds.map(buildElFeed);

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
    case 'start':
      break;
    case 'gettingData':
      blockButton();
      break;
    case 'rssAlradyExist':
      elColMd10.appendChild(stausLinkGenerator('rssAlradyExist'));
      makeButtonActive();
      break;
    case 'addingposts':
      elColMd10.appendChild(stausLinkGenerator('addingposts'));
      document.querySelector('#content').remove();
      elContent.appendChild(buildContentFrame());
      document.querySelector('.feeds').querySelector('ul').append(...addAllFeeds(state.feeds));
      document.querySelector('.posts').querySelector('ul').append(...addAllPosts(state.posts));
      makeButtonActive();
      break;
    case 'updating':
      document.querySelector('.posts').querySelector('ul').prepend(...addNewPosts(state.tmpNewPosts));
      break;
    case 'dataIsWrong':
      elColMd10.appendChild(stausLinkGenerator('dataIsWrong'));
      makeButtonActive();
      break;
    case 'linkIsNotValid':
      elColMd10.appendChild(stausLinkGenerator('linkIsNotValid'));
      makeButtonActive();
      break;
    default:
      break;
  }
});

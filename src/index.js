import i18n from 'i18next';
import 'bootstrap/scss/bootstrap.scss';
import app from './main';
import updater from './updater';
import initView from './view';
import ru from './locales/ru';
import en from './locales/ru';

const state = {
  mainstate: 'starting',
  currentLink: null,
  addedLinks: [],
  posts: [],
  tmpNewPosts: [],
  feeds: [],
};


i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru, en,
  },
}).then((t) => {
  const watchedState = initView(state, t);
  app(watchedState);
  updater(watchedState);
});


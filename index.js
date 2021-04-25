import i18n from 'i18next';
import 'bootstrap/scss/bootstrap.scss';
import app from './src/main';
import updater from './src/updater';
import initView from './src/view';
import ru from './src/locales/ru';
import en from './src/locales/en';

const state = {
  mainstate: 'starting',
  currentLink: null,
  addedLinks: [],
  posts: [],
  tmpNewPosts: [],
  feeds: [],
};


i18n.init({
  lng: 'en',
  debug: true,
  resources: {
    ru, en,
  },
}).then((t) => {
  const watchedState = initView(state, t);
  app(watchedState);
  updater(watchedState);
});


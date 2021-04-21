import 'bootstrap/scss/bootstrap.scss';
import app from './main';
import updater from './updater';
import initView from './view';

const state = {
  mainstate: 'starting',
  currentLink: null,
  addedLinks: [],
  posts: [],
  feeds: [],
};

const watchedState = initView(state);

app(watchedState);
updater(watchedState);


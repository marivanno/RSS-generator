/* eslint-disable no-console */
import * as yup from 'yup';
// import handler from './handler';
import view from './view';
import getDataXML from './utilits';
import parser from './parser';

const state = {
  tmpXML: null,
  mainstate: 'starting',
  currentLink: {
    data: null,
    validateStatus: null,
  },
  addedLinks: [],
  posts: [],
  feeds: [],
};

export default () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    state.currentLink.data = data.get('url');
    form.reset();
    const schema = yup.string().url();
    schema.validate(state.currentLink.data)
      .then((link) => {
        state.currentLink.validateStatus = true;
        state.currentLink.data = link;
        state.addedLinks.push(link);
        view(state).mainstate = 'valid';
      }).catch((err) => {
        view(state).mainstate = 'notvalid';
        throw console.error(err);
      }).then(() => {
        view(state).mainstate = 'handling';
        return getDataXML(state.currentLink.data);
      })
      .then((dataXML) => {
        state.tmpXML = dataXML.data;
      })
      .then(() => {
        const { feed, posts } = parser(state.tmpXML);
        state.feeds = [...state.feeds, ...feed];
        state.posts = [...state.posts, ...posts];
        console.log(state.posts);
        console.log(state.feeds);
        view(state).mainstate = 'addingposts';
      })
      .then(() => console.log('sucsess'));
  });
};

/* eslint-disable no-console */
import * as yup from 'yup';
// import handler from './handler';
import _ from 'lodash';
import view from './view';
import getXML, { isValidData } from './utilits';
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
        if (_.findIndex(state.addedLinks, { link }) === -1) {
          state.addedLinks.push({ link });

          view(state).mainstate = 'gettingData';
          getXML(state.currentLink.data).then((XML) => isValidData(XML.data))
            .catch((err) => {
              view(state).mainstate = 'dataIsWrong';
              throw new Error(err);
            })
            .then((dataXML) => {
              view(state).mainstate = 'hendlingGettedData';
              const { feed, posts } = parser(dataXML);
              state.feeds = [...state.feeds, ...feed];
              state.posts = [...state.posts, ...posts];
            })
            .then(() => {
              view(state).mainstate = 'addingposts';
              console.log('the end');
              console.log(state);
            });
        } else view(state).mainstate = 'rssAlradyExist';
      }).catch((err) => {
        view(state).mainstate = 'linkIsNotValid';
        throw new Error(err);
      });
  });
};

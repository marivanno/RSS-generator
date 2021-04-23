/* eslint-disable no-console */
import * as yup from 'yup';
import _ from 'lodash';
import getXML, { isValidData } from './utilits';
import parser from './parser';

export default (state) => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    state.currentLink = data.get('url');
    form.reset();
    const schema = yup.string().url();
    schema.validate(state.currentLink)
      .then((link) => {
        state.currentLink = link;
        if (_.findIndex(state.addedLinks, { link }) === -1) {
          state.addedLinks.push({ link });

          state.mainstate = 'gettingData';
          getXML(state.currentLink).then((XML) => isValidData(XML.data.contents))
            .catch((err) => {
              state.mainstate = 'dataIsWrong';
              state.addedLinks.pop();
              throw new Error(err);
            })
            .then((dataXML) => {
              state.mainstate = 'hendlingGettedData';
              const { feed, posts } = parser(dataXML);
              state.feeds.push({ ...feed, ...{ link: state.currentLink } });
              state.posts = [...posts, ...state.posts];
            })
            .then(() => {
              state.mainstate = 'addingposts';
            });
        } else state.mainstate = 'rssAlradyExist';
      }).catch((err) => {
        state.mainstate = 'linkIsNotValid';
        throw new Error(err);
      });
  });
};

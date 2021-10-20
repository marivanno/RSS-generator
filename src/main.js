import * as yup from 'yup';
import _ from 'lodash';
import getXML, { isValidData } from './utilits';
import parser from './parser';

const hasLink = (links, link) => _.findIndex(links, { link }) === -1;

const form = document.querySelector('.rss-form');

export default (state) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    state.currentLink = data.get('url');
    form.reset();
    const schema = yup.string().url();

    try {
      const link = await schema.validate(state.currentLink);
      state.currentLink = link;
      if (hasLink(state.addedLinks, link)) {
        state.addedLinks.push({ link });
        state.mainstate = 'gettingData';
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('...................')
      hasLink(state.addedLinks, state.currentLink)
        ? state.mainstate = 'rssAlradyExist'
        : state.mainstate = 'linkIsNotValid';
        throw new Error('Somethig Wrong');
    }

    try {
      const XML = await getXML(state.currentLink);
      const dataXML = await isValidData(XML.data.contents);
      const { feed, posts } = parser(dataXML);
      state.feeds.push({ ...feed, ...{ link: state.currentLink } });
      state.posts = [...posts, ...state.posts];
      state.mainstate = 'addingposts';
    } catch (err) {
      state.mainstate = 'dataIsWrong';
      state.addedLinks.pop();
      throw new Error(err);
    }
  });
};

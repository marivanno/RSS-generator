import _ from 'lodash';
import view from './view';
import getXML, { isValidData } from './utilits';
import parser from './parser';

const updateHandler = (state) => {
  state.feeds.forEach(({ link }) => {
    getXML(link).then((dataXML) => {
      view(state).mainstate = 'hendlingGettedData';
      const { posts } = parser(dataXML.data);
      const oldPosts = state.posts.map(({ title }) => title);
      const newPosts = posts.filter(({ title }) => oldPosts.indexOf(title) === -1);
      console.log(posts)
      state.posts = [...state.posts, ...newPosts];
    })
      .then(() => {
        view(state).mainstate = 'updating';
      });
  });
  setTimeout(updateHandler, 5000, state);
};

export default updateHandler;

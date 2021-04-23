import getXML from './utilits';
import parser from './parser';

const updateHandler = (state) => {
  state.feeds.forEach(({ link }) => {
    getXML(link).then((dataXML) => {
      state.mainstate = 'start';
      const { posts } = parser(dataXML.data.contents);
      const oldPosts = state.posts.map(({ title }) => title);
      const newPosts = posts.filter(({ title }) => oldPosts.indexOf(title) === -1);
      state.posts = [...newPosts, ...state.posts];
      state.tmpNewPosts = newPosts;
    })
      .then(() => {
        state.mainstate = 'updating';
      });
  });
  setTimeout(updateHandler, 5000, state);
};

export default updateHandler;

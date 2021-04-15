import _ from 'lodash';

const parser = (xmlData) => {
  try {
    const parserDom = new DOMParser();
    const dom = parserDom.parseFromString(xmlData, 'text/xml');
    const postsNode = dom.querySelectorAll('item');
    const feed = [{
      id: _.uniqueId(),
      title: dom.querySelector('title').textContent,
      description: dom.querySelector('description').textContent,
      link: dom.querySelector('link').textContent,
    }];
    const posts = Array.from(postsNode).map((item) => ({
      feedid: feed[0].id,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    }));
    return { feed, posts };
  } catch {
    throw console.log('error');
  }
};

export default parser;

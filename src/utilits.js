/* eslint-disable import/no-cycle */
import axios from 'axios';

const corsProxy = 'https://hexlet-allorigins.herokuapp.com/get?url=';

export default (link) => axios.get(`${corsProxy}${encodeURIComponent(link)}&disableCache=true`).catch((err) => {
  throw console.error(err);
});

export const isValidData = (data) => new Promise((resolve, reject) => {
  const parserDom = new DOMParser();
  const dom = parserDom.parseFromString(data, 'application/xml');
  if (dom.documentElement.tagName === 'html') {
    reject(new Error('it is wrong data'));
    return;
  }
  resolve(data);
});


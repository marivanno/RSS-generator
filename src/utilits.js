/* eslint-disable import/no-cycle */
import axios from 'axios';
import view from './view';

const corsProxy = 'https://api.allorigins.win/raw?url=';

export default (link) => axios.get(`${corsProxy}${link}`).catch((err) => {
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


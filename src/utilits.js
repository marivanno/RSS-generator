/* eslint-disable import/no-cycle */
import axios from 'axios';

const corsProxy = 'https://hexlet-allorigins.herokuapp.com/get?url=';

export default (link) => axios.get(`${corsProxy}${encodeURIComponent(link)}&disableCache=true`).catch((err) => {
  throw console.error(err);
});

export const isValidData = (data) => new Promise((resolve, reject) => {
  const parserDom = new DOMParser();
  const dom = parserDom.parseFromString(data, 'application/xml');
  console.log(dom.documentElement.tagName)
  if (dom.documentElement.tagName === 'parsererror') {
    reject(new Error('it is wrong data'));
    return;
  }
  resolve(data);
});


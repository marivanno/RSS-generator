import axios from 'axios';
import * as yup from 'yup';
import view from './view';

const corsProxy = 'https://api.allorigins.win/raw?url=';

export default (link) => axios.get(`${corsProxy}${link}`).catch((err) => {
  throw console.error(err);
});

// const validate = (state) => {
//   const schema = yup.string().url();
//   schema.validate(state.currentLink.data)
//     .then((link) => {
//       state.currentLink.validateStatus = true;
//       state.currentLink.data = link;
//       state.addedLinks.push(link);
//       view(state).mainstate = 'valid';
//     }).catch((err) => {
//       view(state).mainstate = 'notvalid';
//       throw console.error(err);
//     });
// };

// export const isValidData = (data) => {
//   const parserDom = new DOMParser();
//   const dom = parserDom.parseFromString(data, 'text/xml');
//   return dom.documentElement.tagName !== 'html';
// };

export const isValidData = (data) => new Promise((resolve, reject) => {
  const parserDom = new DOMParser();
  const dom = parserDom.parseFromString(data, 'text/xml');
  if (dom.documentElement.tagName === 'html') {
    reject(new Error('it is wrong data'));
    return;
  }
  resolve(data);
});

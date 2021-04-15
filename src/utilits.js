import axios from 'axios';

const corsProxy = 'https://api.allorigins.win/raw?url=';

export default (link) => axios.get(`${corsProxy}${link}`).catch((err) => {
  throw console.error(err);
});

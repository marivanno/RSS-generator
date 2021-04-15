import onChange from 'on-change';
import view from './view';
import parser from './parser';

export default (state) => onChange(state, (path, value) => {
  parser(state.currentLink.data)
  // switch (path) {
  //   case 'currentLink.validateStatus':
  //     view('notvalid');
  //     break;
  //   case 'addedLinks':
  //     view('getting');
  //     parser(state.currentLink.data).then((data) => {
  //       console.log(data);
  //     });
  //     break;
  //   default:
  //     break;
  // }
});

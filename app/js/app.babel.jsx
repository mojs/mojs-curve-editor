import './tags/curve-editor.tag';
require('../css/main');

import store from './store';

// TODO
//   - init points with function
//   - move bunch of points at once
//   - add grid background

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('curve-editor', { store });
});

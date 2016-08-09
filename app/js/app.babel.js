import './tags/curve-editor.tag';
require('../css/main');

import store from './store';

document.addEventListener('DOMContentLoaded', () => {
  riot.mount('curve-editor', { store });
});

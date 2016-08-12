// import './tags/curve-editor.tag';
require('../css/main');
import {render, h} from 'preact';
import CurveEditor from './tags/curve-editor';
import store from './store';

// TODO
//   - init points with function
//   - move bunch of points at once
//   - add grid background

document.addEventListener('DOMContentLoaded', () => {
  render(<CurveEditor state={ store.getState() }  />, document.body);
  // store.subscribe(renderRoot);
});

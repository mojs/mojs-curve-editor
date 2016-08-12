// import './tags/curve-editor.tag';
require('../css/main');
import {render, h} from 'preact';
import CurveEditor from './tags/curve-editor';
import store from './store';
import { Provider } from 'preact-redux';

// TODO
//   - init points with function
//   - move bunch of points at once
//   - add grid background

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <CurveEditor />
    </Provider>, document.body);
});

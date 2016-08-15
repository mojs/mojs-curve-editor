// import './tags/curve-editor.tag';
require('../css/main');
import {render, h} from 'preact';
import CurveEditor from './tags/curve-editor';
import store from './store';
import { Provider } from 'preact-redux';

// TODO
//   - select at touch
//   - move bunch of points at once
//   - add APIs

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <CurveEditor />
    </Provider>, document.body);
});

// import './tags/curve-editor.tag';
require('../css/main');
import { Provider } from 'preact-redux';
import {render, h}  from 'preact';
import CurveEditor  from './tags/curve-editor';
import store        from './store';
import C            from './constants';

// TODO
//   - instance dropdown on code panel
//   - add orange point on seleced point control/ hightlight the control
//   - save state to LC
//   - add APIs
//   - import path data
//   - move bunch of points at once

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <CurveEditor />
    </Provider>, document.body);
});

store.dispatch({ type: 'POINT_ADD', data: { point: {x: 0,   y: C.CURVE_SIZE, isLockedX: true}, index: 0 } });
store.dispatch({ type: 'POINT_ADD', data: { point: {x: 100, y: 0, isLockedX: true}, index: 1 } });

//   makePoint({ x: 0,   y: C.CURVE_SIZE, isLockedX: true, type: 'straight' }),
//   // makePoint({ x: 50,  y: C.CURVE_SIZE/2, type: 'mirrored' }),
//   makePoint({ x: 100, y: 0, isLockedX: true })

// curve
//   .getFunction({ isInverseX: false, isInverseY: true, name: 'Some name' })
//   .getCode()




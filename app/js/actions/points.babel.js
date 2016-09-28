import C from '../constants';

export function reset (store) {
  store.dispatch({ type: 'POINTS_REMOVE' });
  store.dispatch({ type: 'POINT_ADD', data: { point: {x: 0,   y: C.CURVE_SIZE, isLockedX: true}, index: 0 } });
  store.dispatch({ type: 'POINT_ADD', data: { point: {x: 100, y: 0, isLockedX: true}, index: 1 } });
}
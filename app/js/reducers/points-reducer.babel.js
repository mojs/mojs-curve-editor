import makePoint from '../helpers/make-point';

const INITIAL_STATE = [
  makePoint({ x: 0,   y: 358 }),
  makePoint({ x: 100, y: 0 })
];

const pointsReducer = (state = INITIAL_STATE, action) => {
  switch( action.type ) {
    case 'POINT_TRANSLATE': {
      const {data}   = action,
            {index}  = data,
            oldPoint = state[index],
            newState = [ ...state ];

      newState[ data.index ] = { ...oldPoint, tempX: data.x, tempY: data.y }
      return newState;
    }
  }
  return state;
}

export default pointsReducer;
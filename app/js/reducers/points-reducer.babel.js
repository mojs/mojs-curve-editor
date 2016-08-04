import makePoint from '../helpers/make-point';

const INITIAL_STATE = [
  makePoint({ x: 0,   y: 358, isLockedX: true }),
  makePoint({ x: 50,  y: 179 }),
  makePoint({ x: 100, y: 0, isLockedX: true })
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
    case 'POINT_TRANSLATE_END': {
      const {data}   = action,
            {index}  = data,
            oldPoint = state[index],
            newState = [ ...state ];

      newState[ data.index ] = {
          ...oldPoint,
          tempX: 0, tempY: 0,
          x: data.x, y: data.y
        }

      return newState;
    }
    case 'POINT_DELETE': {
      const newState = [ state[0], state[2] ];

      return newState;
    }
  }
  return state;
}

export default pointsReducer;
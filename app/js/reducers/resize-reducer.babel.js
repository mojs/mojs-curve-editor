import C from '../constants';

const INITIAL_STATE = {
  translate:    { x: 150, y: 100 },
  top:          0,
  temp_top:     0,

  right:        0,
  temp_right:   0,

  bottom:       0,
  temp_bottom:  0,
  scalerX:      C.CURVE_PERCENT
}

const resizeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EDITOR_RESIZE': {
      const {data} = action,
            {type} = data,
            delta  = ( type === 'top' || type === 'bottom' ) ? data.y : data.x;

      const newState = { ...state, [`temp_${type}`]: delta };
      // if `right`size changed - calculate the scaler for x axis
      if ( type === 'right' ) {
        newState[ 'scalerX' ] = (C.CURVE_SIZE + Math.max( state.right + delta, 0 ))/100;
      }
      return newState;
    }

    case 'EDITOR_RESIZE_END': {
      const {data} = action;
      const {type} = data;
      const delta = ( type === 'top' || type === 'bottom' ) ? data.y : data.x;
      // get the total resize value ( temporary + actual )
      const resize = state[`${action.data.type}`] + delta;
      // if the type if to - it has the `-` as base so we need to swap methods
      const mathMethod = ( type === 'top' ) ? 'min' : 'max';
      const newState = { ...state,
        [`${action.data.type}`]: Math[mathMethod](0, resize),
        [`temp_${action.data.type}`]: 0
      };

      return newState;
    }

    case 'EDITOR_TRANSLATE': { return { ...state, translate: action.data }; }
  }
  return state;
}

export default resizeReducer;
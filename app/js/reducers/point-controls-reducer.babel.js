import pool from '../pool';

const INITIAL_STATE = {
  isShow: false,
  type:   'straight'
}

const pointControls = (state = INITIAL_STATE, action) => {
  pool.push( state );
  switch (action.type) {
    // probably redundant
    // case 'POINT_ADD': {
    //   return { ...state, isShow: true, type: 'straight' };
    // }
    case 'POINT_SELECT': {
      const type = action.data.type;
      return { ...state, isShow: !action.isDeselect, type };
    }
    case 'POINT_CHANGE_TYPE': {
      return { ...state, type: action.data }; 
    }
    case 'POINT_DESELECT_ALL': {
      return { ...state, isShow: false };
    }
  }
  return state;
}

export default pointControls;
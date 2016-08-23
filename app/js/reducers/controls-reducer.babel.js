import calculatePath from '../helpers/calculate-path';
import pool from '../pool';

const INITIAL_STATE = { isCode: false }

const controls = (state = INITIAL_STATE, action) => {
  pool.push( state );
  switch (action.type) {
    case 'CODE_TAP': {
      return { ...state, isCode: !state.isCode };
    }
  }
  return state;
}

export default controls;
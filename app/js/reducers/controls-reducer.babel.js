import calculatePath from '../helpers/calculate-path';

const INITIAL_STATE = {
  isCode: false
}

const pointControls = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CODE_TAP': {
      return { ...state, isCode: !state.isCode };
    }
  }
  return state;
}

export default pointControls;
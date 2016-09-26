import pool from '../pool';

const INITIAL_STATE = {
  selected:   0,
  lines:      []
};

const getColor = (lines) => {
  const COLORS = [ '#FF512F', '#FF00C5', '#00FF69', 'white', '#1B8FE6', 'CYAN', 'YELLOW' ];

  return COLORS[ lines.length % COLORS.length ];
}

const makeProgressLine = (o ={}, state) => {
  const {lines} = state;
  return {
    // progress:     0,
    color:        getColor(lines),
    name:         `easing${lines.length+1}`
  }
}

const progresses = (state = INITIAL_STATE, action) => {
  pool.push( state );
  
  switch (action.type) {

    case 'ADD_PROGRESS_LINE': {
      const newState = { ...state };
      newState.lines = [ ...newState.lines, makeProgressLine( action.data, state ) ];
      return newState;
    }

    case 'SET_SELECTED_PROGRESS_LINE': {
      const {index}    = action;
      return { ...state, selected: index };
    }
    
    // case 'SET_PROGRESS_LINE_SHIFT': {
    //   const {data}    = action,
    //         {index}   = data,
    //         newState  = { ...state },
    //         {lines}   = newState;

    //   newState.lines  = [ ...lines.slice( 0, index ),
    //                       { ...lines[index], progress: data.progress },
    //                       ...lines.slice( index+1 )
    //                     ];

    //   return newState;
    // }
  }
  return state;
}

export default progresses;
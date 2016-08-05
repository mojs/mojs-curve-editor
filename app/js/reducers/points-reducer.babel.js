import makePoint from '../helpers/make-point';

const INITIAL_STATE = [
    makePoint({ x: 0,   y: 358, isLockedX: true }),
    makePoint({ x: 50,  y: 179, type: 'mirrored' }),
    makePoint({ x: 100, y: 0, isLockedX: true })
  ];

const deslectAll = (state) => {
  const newState = [];
  for (var i = 0; i < state.length; i++) {
    newState.push({ ...state[i], isSelected: false });
  }
  return newState;
}

const findSelectedIndecies = (state) => {
  const indecies = [];
  for (var i = 0; i < state.length; i++) {
    state[i].isSelected && indecies.push( i );
  }
  return indecies;
}

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
    
    case 'POINT_SELECT': {
      const {data}        = action,
            {index}       = data,
            {isDeselect}  = data,
            // if should de select all other points
            newState      = (isDeselect) ? deslectAll( state ) : [ ...state ];

      newState[index].isSelected = true;
      return newState;
    }

    case 'POINT_ADD': {
      const {data}        = action,
            {x, y, index} = data;

      const deselected = deslectAll( state );

      return [
        ...deselected.slice( 0, index ),
        makePoint({ x, y, isSelected: true }),
        ...deselected.slice( index )
      ]
    }
    case 'POINT_DELETE': {
      const selected = findSelectedIndecies(state);

      const newState = [];
      for (var i = 0; i < state.length; i++) {
        const item = state[i];
        ( selected.indexOf(i) === -1 || item.isLockedX ) && newState.push( item );
      }

      return newState;
    }

    case 'POINT_CHANGE_TYPE': {
      const selected = findSelectedIndecies(state);

      const newState = [];
      for (var i = 0; i < state.length; i++) {
        const item = state[i];
        // copy all items from previous state
        newState.push( { ...item } );
        // if item was selected - set the new `type`
        ( selected.indexOf(i) !== -1 ) && (newState[i].type = action.data);
      }

      return newState;
    }

    case 'POINT_DESELECT_ALL': {
      return deslectAll( state );
    }
  }
  return state;
}

export default pointsReducer;
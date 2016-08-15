import makePoint from '../helpers/make-point';
import C from '../constants';
import initPoints from '../helpers/init-points';

const INITIAL_STATE = [
    makePoint({ x: 0,   y: C.CURVE_SIZE, isLockedX: true, type: 'straight' }),
    makePoint({ x: 50,  y: C.CURVE_SIZE/2, type: 'mirrored' }),
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

const pointsReducer = (state = initPoints(INITIAL_STATE), action) => {
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
      const index    = action.data,
            oldPoint = state[index],
            newState = [ ...state ];

      newState[ index ] = {
          ...oldPoint,
          x: oldPoint.x + oldPoint.tempX,
          y: oldPoint.y + oldPoint.tempY,
          tempX: 0, tempY: 0
        }

      return newState;
    }
    
    case 'POINT_SELECT': {
      const {data}              = action,
            {index, isDeselect} = data,
            newState            = (isDeselect) ? deslectAll( state ) : [ ...state ];
      
      const point = newState[index];
      point.isSelected = true;
      return newState;
    }

    case 'POINT_ADD': {
      const {data}        = action,
            {x, y, index} = data,
            deselected = deslectAll( state );

      const newState = [
        ...deselected.slice( 0, index ),
        makePoint({ x, y, isSelected: true }),
        ...deselected.slice( index )
      ];

      return initPoints( newState );
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
        const type = action.data;
        // copy all items from previous state
        newState.push( { ...item } );
        // if item was selected - set the new `type`
        ( selected.indexOf(i) !== -1 ) && (newState[i].type = type);
        
        const index = i;
        const point = newState[index];
        const sibPoint = (index === newState.length-1)
                ? newState[index-1] : newState[index+1];

        const handleIndex = (index === newState.length-1) ? 1 : 2;
        const sibHandleIndex = (handleIndex === 1) ? 2 : 1;
        const handleName = `handle${handleIndex}`;
        const sibHandleName = `handle${sibHandleIndex}`;
        const handle = { ...point[handleName] };
        const sibHandle = { ...point[sibHandleName] };
        point[handleName] = handle;
        point[sibHandleName] = sibHandle;

        if ( type === 'mirrored' || type === 'asymmetric' ) {
          sibHandle.angle = handle.angle - 180;
          if ( type === 'mirrored' ) { sibHandle.radius = handle.radius; }
        }

      }

      return newState;
    }
    
    case 'POINT_DESELECT_ALL': {
      return deslectAll( state );
    }


    // HANDLES
    case 'HANDLE_TRANSLATE': {
      const {data} = action;
      // create new state and copy the new point into it
      const newState = [...state];
      const newPoint = { ...newState[data.parentIndex] };
      newState[data.parentIndex] = newPoint;
      // create handle and copy it into the new point
      const handleName = `handle${data.index}`;
      const newHandle = { ...newPoint[handleName] };
      newPoint[ handleName ] = newHandle;
      // finally add angle and radius
      newHandle.angle  = data.angle;
      newHandle.radius = data.radius;
      
      return newState;
    }
  }
  return state;
}

export default pointsReducer;
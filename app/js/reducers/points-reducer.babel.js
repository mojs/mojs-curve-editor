import makePoint from '../helpers/make-point';
import C from '../constants';
import initPoints from '../helpers/init-points';
import calculatePath from '../helpers/calculate-path';
import deselectAll from '../helpers/deselect-all';
import findSelectedIndecies from '../helpers/find-selected-indecies';
import pool from '../pool';

const INITIAL_STATE = {
  path:       '',
  name:       'mojs-curve-editor',
  segments:   [],
  points:     []
  // points: initPoints([
  //   makePoint({ x: 0,   y: C.CURVE_SIZE, isLockedX: true, type: 'straight' }),
  //   // makePoint({ x: 50,  y: C.CURVE_SIZE/2, type: 'mirrored' }),
  //   makePoint({ x: 100, y: 0, isLockedX: true })
  // ])
}

const pointsReducer = (state = INITIAL_STATE, action) => {
  pool.push( state );
  switch( action.type ) {
    case 'SET_EDITOR_NAME': {
      return { ...state, name: action.data };
    }

    case 'POINT_TRANSLATE': {
      const {data}    = action,
            {index}   = data,
            {points}  = state,
            oldPoint  = points[index],
            newPoints = [ ...points ];

      newPoints[ data.index ] = { ...oldPoint, tempX: data.x, tempY: data.y }
      return { ...state, points: newPoints, ...calculatePath( newPoints ) };
    }

    case 'POINT_TRANSLATE_END': {
      const index     = action.data,
            {points}  = state,
            oldPoint  = points[index],
            newPoints = [ ...points ];

      newPoints[ index ] = {
          ...oldPoint,
          x: oldPoint.x + oldPoint.tempX,
          y: oldPoint.y + oldPoint.tempY,
          tempX: 0, tempY: 0
        }

      return { ...state, points: newPoints, ...calculatePath( newPoints ) };
    }
    
    case 'POINT_SELECT': {
      const {data}              = action,
            {index, isDeselect} = data,
            newState            = (isDeselect) ? deselectAll( state ) : { ...state },
            {points}            = newState;
      
      const point = points[index];
      point.isSelected = true;
      return { ...state, points };
    }

    case 'POINT_ADD': {
      const {data}         = action,
            {index, point} = data,
            deselected     = deselectAll( state );

      const newPoints = [
        ...deselected.points.slice( 0, index ),
        makePoint({ ...point }),
        ...deselected.points.slice( index )
      ];

      const points = (newPoints.length > 1)
                        ? initPoints( newPoints ) : newPoints;

      const path = (points.length > 1)
                      ? calculatePath( points ) : {};

      return { ...state, points, ...path };
    }
    
    case 'POINT_DELETE': {
      const {points} = state,
            selected = findSelectedIndecies(points);

      const newPoints = [];
      for (var i = 0; i < points.length; i++) {
        const item = points[i];
        ( selected.indexOf(i) === -1 || item.isLockedX ) && newPoints.push( item );
      }

      return { ...state, points: newPoints, ...calculatePath( newPoints ) };
    }

    case 'POINT_CHANGE_TYPE': {
      const {points} = state,
            type = action.data,
            selected = findSelectedIndecies(points);

      // change type on all selected items
      const newPoints = [ ...points ];
      for (var i = 0; i < selected.length; i++) {
        const index = selected[i],
              point = { ...newPoints[index], type },
              handleIndex = (index === newPoints.length-1) ? 1 : 2,
              sibHandleIndex = (handleIndex === 1) ? 2 : 1,
              handleName = `handle${handleIndex}`,
              sibHandleName = `handle${sibHandleIndex}`,
              handle = { ...point[handleName] },
              sibHandle = { ...point[sibHandleName] };
        
        // move the opposite little handle with certain types
        if ( type === 'mirrored' || type === 'asymmetric' ) {
          sibHandle.angle = handle.angle - 180;
          if ( type === 'mirrored' ) {
            sibHandle.radius = handle.radius;
          }
        }

        // save new point and handles
        newPoints[index]     = point;
        point[handleName]    = handle;
        point[sibHandleName] = sibHandle;

      }

      return { ...state, points: newPoints, ...calculatePath( newPoints ) };
    }
    
    case 'POINT_DESELECT_ALL': {
      return { ...deselectAll( state ) };
    }

    case 'SET_ACTIVE': {
      return (!action.data) ? { ...deselectAll( state ) } : state;
    }

    // HANDLES
    case 'HANDLE_TRANSLATE': {
      const {points}  = state,
            {data}    = action;
      // create new state and copy the new point into it
      const newPoints = [...points],
            newPoint  = { ...newPoints[data.parentIndex] };

      newPoints[data.parentIndex] = newPoint;
      // create handle and copy it into the new point
      const handleName = `handle${data.index}`,
            newHandle = { ...newPoint[handleName] };

      newPoint[ handleName ] = newHandle;
      // finally add angle and radius
      newHandle.angle  = data.angle;
      newHandle.radius = data.radius;

      return { ...state, points: newPoints, ...calculatePath( newPoints ) };
    }

    case 'HANDLE_TRANSLATE_END': {
      return state;
    }

    case 'POINTS_REMOVE': {
      return {...state, points: []};
    }

    // case 'EDITOR_RESIZE': {
    //   const {data} = action,
    //         points = [...state.points],
    //         {type, resize} = data;

    //   // return state if resize to the `right`
    //   if (type === 'right') { return state; }

    //   // normalize points' y regarding resize
    //   if ( type === 'top' ) {
    //     for (var i = 0; i < points.length; i++) {
    //       const borderTop = Math.min(resize.top + data.y, 0),
    //             point     = points[i];
    //       if (point.y < borderTop) { point.y = borderTop; }
    //     }
    //   } else if ( type === 'bottom' ) {
    //     for (var i = 0; i < points.length; i++) {
    //       const borderBottom = Math.max(resize.bottom + data.y, 0) + C.CURVE_SIZE,
    //             point     = points[i];

    //       if (point.y > borderBottom) { point.y = borderBottom; }
    //     }
    //   }

    //   return { ...state, points, ...calculatePath( points ) };
    // }

  }
  return state;
}

export default pointsReducer;
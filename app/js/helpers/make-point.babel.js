
const fallback = ( value, fallback ) => {
  return ( value != null ) ? value : fallback;
}

const makePositionPoint = (o={}) => {
  return {
    // coordinates
    x:    fallback( o.x, 0 ),
    y:    fallback( o.y, 0 ),
    // temporary coordinates (when user moves the point) -
    // should not be in history
    tempX: fallback( o.tempX, 0 ),
    tempY: fallback( o.tempY, 0 ),
    // state
    isTouched:  fallback( o.isTouched, false ),
    isSelected: fallback( o.isSelected, false ),
  };
}

const makePoint = (o = {}) => {
  return {
    // state
    // isOneHandle: fallback( o.isOneHandle, false ),
    isLockedX:   fallback( o.isLockedX, false ),
    isLockedY:   fallback( o.isLockedY, false ),
    // type of the point:
    //   'straight' || 'mirrored' || 'disconnected' || 'asymetric'
    type:       fallback( o.type, 'straight' ),
    // add position attributes to self
    ...makePositionPoint(o),
    // add curve handles
    handle1: makePositionPoint(o.handle1),
    handle2: (!o.isOneHandle) ? makePositionPoint(o.handle2) : undefined
  };
}

export default makePoint;
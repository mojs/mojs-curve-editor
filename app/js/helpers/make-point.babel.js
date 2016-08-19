
const fallback = ( value, fallback ) => {
  return ( value != null ) ? value : fallback;
}


const makeHandlePoint = (o={}) => {
  return {
    index:      fallback( o.index, 0 ),
    // coordinates
    angle:      fallback( o.angle,  null ),
    radius:     fallback( o.radius, null ),
    // state
    isTouched:  fallback( o.isTouched, false ),
    isSelected: fallback( o.isSelected, false ),
  };
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
    handle1: makeHandlePoint(o.handle1 || { index: 1 }),
    handle2: makeHandlePoint(o.handle2 || { index: 2 })
  };
}

export default makePoint;
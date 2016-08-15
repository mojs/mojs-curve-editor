import C from '../constants';

export default (point, sibPoint, handleIndex) => {

  point = { ...point };

  const handleName     = `handle${handleIndex}`,
        sibHandleIndex = (handleIndex === 1) ? 2 : 1,
        sibHandleName  = `handle${sibHandleIndex}`,
        handle         = { ...point[handleName] },
        sibHandle      = { ...point[sibHandleName] },
        type           = point.type;

  point[handleName] = handle;
  point[sibHandleName] = sibHandle;

  if ( handle.angle == null || handle.radius == null ) {
    handle.radius = 50;

    const dy = (sibPoint.y - point.y) / C.CURVE_PERCENT,
          dx = sibPoint.x - point.x;
    
    let angle = Math.atan( dy/dx ) * (180/Math.PI) - 90;
    if ( dx > 0 ) { angle = angle - 180 };

    handle.angle = angle;
    sibHandle.radius = handle.radius;
    sibHandle.angle  = handle.angle - 180;
  }

  return point;
}
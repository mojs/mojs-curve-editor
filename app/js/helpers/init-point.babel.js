import C from '../constants';

export default (point, sibPoint, handleIndex) => {

  point = { ...point };

  const handleName = `handle${handleIndex}`,
    sibHandleIndex = (handleIndex === 1) ? 2 : 1,
    sibHandleName = `handle${sibHandleIndex}`,
    handle = { ...point[handleName] },
    sibHandle = { ...point[sibHandleName] },
    type = point.type;

  point[handleName] = handle;
  point[sibHandleName] = sibHandle;

  if (handle.rotate == null || handle.radius == null) {
    handle.radius = 50;

    const dy = (sibPoint.y - point.y) / C.CURVE_PERCENT,
      dx = sibPoint.x - point.x;

    let rotate = Math.atan(dy / dx) * (180 / Math.PI) - 90;
    if (dx > 0) { rotate = rotate - 180 };

    handle.rotate = rotate;
    sibHandle.radius = handle.radius;
    sibHandle.rotate = handle.rotate - 180;
  }

  return point;
}

import 'path-data-polyfill';
import pointToAngle from './point-to-angle';
import C from '../constants';
const { CURVE_PERCENT } = C;

export default (path) => {
  const points = [];
  const pathData = path.getPathData();

  for (let i = 0; i < pathData.length; i++) {
    const dataSegment = pathData[i];
    const isPointFirstOrLast = (i === 0 || i === pathData.length - 1);
    const {type, values} = dataSegment;

    if (type === 'M') {
      let [x, y] = values;
      points.push({
        x,
        y: y * CURVE_PERCENT,
        isLockedX: isPointFirstOrLast
      });
    } else if (type === 'C') {
      const [x1, y1, x2, y2, xNext, yNext] = values;
      const prevPoint = points[i - 1];
      const prevHandle = pointToAngle(
        (x1 - prevPoint.x) * CURVE_PERCENT,
        (y1 * CURVE_PERCENT) - prevPoint.y
      );
      prevPoint.handle2 = prevHandle;

      const point = {
        x: xNext,
        y: yNext * CURVE_PERCENT,
        type: 'disconnected',
        handle1: pointToAngle((x2 - xNext) * CURVE_PERCENT, (y2 - yNext) * CURVE_PERCENT),
        isLockedX: isPointFirstOrLast
      }

      points.push(point);
    }
  }

  return points;
}

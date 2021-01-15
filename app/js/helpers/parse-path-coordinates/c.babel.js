import pointToRotate from '../point-to-rotate';
import C from '../../constants';

const { CURVE_PERCENT } = C;
/**
 * Function to parse *C* `SVG` path command.
 * @param {Array} parsed `C` values.
 * @param {Array} result array of points parsed so far.
 * @returns {Array} array with new parsed points.
 */
export default (values, points, isLockedX) => {
  const [x1, y1, x2, y2, xNext, yNext] = values;
  const prevPoint = points[points.length - 1];

  const prevHandle = pointToRotate(
    (x1 - prevPoint.x) * CURVE_PERCENT,
    (y1 * CURVE_PERCENT) - prevPoint.y
  );
  prevPoint.handle2 = prevHandle;

  const point = {
    x: xNext,
    y: yNext * CURVE_PERCENT,
    type: 'disconnected',
    handle1: pointToRotate((x2 - xNext) * CURVE_PERCENT, (y2 - yNext) * CURVE_PERCENT),
    isLockedX
  }

  return [...points, point];
};

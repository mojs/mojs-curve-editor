import C from '../../constants';

/**
 * Function to parse *M* or *L* `SVG` path command.
 * @param {Array} parsed `M` or `L` values.
 * @param {Array} result array of points parsed so far.
 * @returns {Array} array with new parsed points.
 */
export default (values, points, isLockedX) => {
  const [x, y] = values;
  const newPoint = { x, y: y*C.CURVE_PERCENT, isLockedX };

  return [...points, newPoint];
};

export default (x, y) => {
  const radius = Math.sqrt(x * x + y * y);
  // if `x === 0` set x to 1 because we will divide by `x`
  // and division by 0 is forbidden. (x || 1) part
  let rotate = Math.atan(y / (x || 1)) * (180 / Math.PI) - 90;
  if (x > 0) { rotate = rotate - 180 };

  return { radius, rotate };
}


export default (value, base, snap) => {
  const modified = Math.round(value/base)*base;

  return ( Math.abs(value - modified) < snap ) ? modified : value;
}
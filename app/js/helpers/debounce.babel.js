
export default (fn, time = 25) => {
  let tm = null;
  return () => {
    clearTimeout( tm );
    setTimeout( fn, time );
  }
}
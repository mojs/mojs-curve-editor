/*
  Function that returns the second argument if the first one isn't set.
  @private
  @param {Any} Property to set.
  @param {Any} Property to return as fallback.
  @returns {Any} If set - the first property, if not - the second.
*/
export default (prop, fallback) => {
  return ( prop != null ) ? prop : fallback;
}
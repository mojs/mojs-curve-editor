import mod from './resize-mod';

export default (x, y, type, state) => {
  const {resize} = state;
  // get modulus size for `top` and `bottom` types
  if ( type !== 'right' ) {
    const size = resize[type] + y,
          coef = ( type === 'top' ) ? -1 : 1;
    // normalize the y delta to modulus of CURVE_SIZEs
    y = mod( size, coef );
    y -= resize[type];
    // ensure size won't be less then CURVE_SIZE
    if ( size*coef < 0 ) { y = -resize[type]; }
    // ensure size won't be less then CURVE_SIZE
  } else if ( resize[type] + x < 0 ) { x = -resize[type]; }

  return { x, y, type, resize };
}
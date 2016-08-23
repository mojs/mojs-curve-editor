

import C from '../constants';

const Y_SIZE = C.CURVE_SIZE;
const mod = ( tempResize_top, coef = 1 ) => {
  const MOD = Math.abs(tempResize_top % Y_SIZE),
        DIV = parseInt(tempResize_top / Y_SIZE),
        GAP = 15;

  if (MOD < GAP ) { tempResize_top = DIV*Y_SIZE; }
  else if ( MOD > Y_SIZE - GAP ) { tempResize_top = (DIV+(1*coef))*Y_SIZE; }

  return tempResize_top;
}

export default mod;
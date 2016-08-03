

const mod = ( tempResize_top, coef = 1 ) => {
  const MOD = Math.abs(tempResize_top % 358),
        DIV = parseInt(tempResize_top / 358),
        GAP = 15;

  if (MOD < GAP ) { tempResize_top = DIV*358; }
  else if ( MOD > 358 - GAP ) { tempResize_top = coef*(DIV+1)*358; }

  return tempResize_top;
}

export default mod;
export default (x, y) => {
  let   radius  = Math.sqrt( x*x + y*y ),
        angle   = Math.atan( y/x ) * (180/Math.PI) - 90;
  if ( x > 0 ) { angle = angle - 180 };

  return { radius, angle };
}
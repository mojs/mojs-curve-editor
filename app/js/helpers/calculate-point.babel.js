
import angleToPoint from './angle-to-point';
import C from '../constants';

export default (point, handleIndex = 1) => {
    const x      = point.x + point.tempX,
          y      = point.y + point.tempY,
          handle = point[`handle${handleIndex}`];

  const CHAR = ( handleIndex === 2 ) ? 'C' : '';
  if ( point.type !== 'straight' ) {
    const handleCoords = angleToPoint( handle.angle, handle.radius );
    return `${CHAR}${x + handleCoords.x/C.CURVE_PERCENT}, ${(y + handleCoords.y)/C.CURVE_PERCENT} `;
  } else {
    return `${CHAR}${x}, ${y/C.CURVE_PERCENT} `;
  }
}
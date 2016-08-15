import C from '../constants';
import calculatePoint from './calculate-point';

export default (point, nextPoint, index) => {
    if ( !nextPoint ) { return 1; }

    let string = '',
        segmentString = '';

    const x = point.x + point.tempX,
          y = point.y + point.tempY,
          xNext = nextPoint.x + nextPoint.tempX,
          yNext = nextPoint.y + nextPoint.tempY;

    const part1 = `M${x}, ${y/C.CURVE_PERCENT} `;
    if ( index === 0 ) { string += part1 }
    segmentString += part1;

    const part2 = calculatePoint( point, 2 );
    string += part2;
    segmentString += part2;

    const part3 = calculatePoint( nextPoint, 1 );
    string += part3;
    segmentString += part3;

    const part4 = `${xNext}, ${yNext/C.CURVE_PERCENT} `;
    string += part4;
    segmentString += part4;

    return { string, segmentString, index };
}

import calculateSegment from './calculate-segment';

export default (points) => {
  let path     = '',
      segments = [];

  for (let index = 0; index < points.length-1; index++) {
    const point     = points[index],
          nextPoint = points[index+1];

    const segment = calculateSegment( point, nextPoint, index );
    segments.push(segment);
    
    path += segment.string;
  }

  return { path, segments };
}
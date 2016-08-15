import initPoint from './init-point';

export default (points) => {

  const newPoints = [];
  for (var i = 0; i < points.length; i++) {
    const point = points[i],
          sibPoint = (i === points.length-1)
            ? points[i-1] : points[i+1],
          handleIndex = (i === points.length-1) ? 1 : 2;

    newPoints.push( initPoint( point, sibPoint, handleIndex ) );
  }
  return newPoints;
}
export default (points) => {
  const indecies  = [];

  for (var i = 0; i < points.length; i++) {
    points[i].isSelected && indecies.push( i );
  }

  return indecies;
}
import 'path-data-polyfill';
import parseC from './parse-path-coordinates/c';
import parseM from './parse-path-coordinates/m';

export default (path) => {
  let points = [];
  const pathData = path.getPathData();

  for (let i = 0; i < pathData.length; i++) {
    const isFirstOrLastPoint = (i === 0 || i === pathData.length - 1);
    const {type, values} = pathData[i];

    switch(type) {
      case 'M':
      case 'L':
        points = parseM(values, points, isFirstOrLastPoint);
        break;

      case 'C':
        points = parseC(values, points, isFirstOrLastPoint);
        break;
    }
  }

  return points;
}

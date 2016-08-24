export default (state) => {
  const newState = { ...state, points: [] },
        points   = state.points;

  for (var i = 0; i < points.length; i++) {
    newState.points.push({ ...points[i], isSelected: false });
  }

  return newState;
}
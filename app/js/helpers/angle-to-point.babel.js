export default (angle, radius) => {
  return mojs.h.getRadialPoint({ angle, radius, center: { x: 0, y: 0 } })
}
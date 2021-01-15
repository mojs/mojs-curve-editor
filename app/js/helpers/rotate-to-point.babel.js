export default (rotate, radius) => {
  return mojs.h.getRadialPoint({ rotate, radius, center: { x: 0, y: 0 } })
}

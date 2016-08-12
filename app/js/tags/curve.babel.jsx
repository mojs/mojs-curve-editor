import { h, Component } from 'preact';
import mod from '../helpers/resize-mod';
import C from '../constants';
import Point from './point';
require('../../css/blocks/curve');

const CLASSES = require('../../css/blocks/curve.postcss.css.json');
class Curve extends Component {
  render () {
    const {state} = this.props,
          styles  = this._getStyle( state ),
          points  = this._renderPoints( state );

    return <div className={CLASSES['curve']}>
              <div  className={ CLASSES['curve__background']}
                    style={styles.background} />
              <div  className={ CLASSES['curve__svg-wrapper']}
                    style={styles.transform}>

                { points }

                <svg  height={ C.CURVE_SIZE }
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      class={ CLASSES['curve__svg'] }>
                </svg>

              </div>

            </div>;
  }

  _getStyle(state) {
    const {resize} = state;
    let {temp_top, temp_right} = resize;

    temp_top    += resize.top;
    temp_right  += resize.right;

    if (C.CURVE_SIZE - temp_top < C.CURVE_SIZE) { temp_top = 0; }
    temp_top = mod( temp_top, -1 );

    const scale = `transform: scaleX(${(C.CURVE_SIZE + Math.max(temp_right,0))/C.CURVE_SIZE})`,
          bgTransform = `${mojs.h.prefix.css}${scale}; ${scale};`,
          background = `background-position: 0 ${-temp_top - 1}px; ${bgTransform}`,
          transform  = `transform: translate(0px, ${-temp_top}px)`;
    return {
      background,
      transform: `${mojs.h.prefix.css}${transform}; ${transform};`
    };
  }

  _renderPoints (state) {
    const pointsData = state.points.present,
          points     = [],
          len        = pointsData.length;

    for (var i = 0; i < len; i++) {
      points.push(
        <Point point={ pointsData[i] } state={state} index={i} pointsCount={len} />
        );
    }

    return points;
  }
}

export default Curve;
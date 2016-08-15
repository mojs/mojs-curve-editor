import { h, Component } from 'preact';
import angleToPoint from '../helpers/angle-to-point';
import Point from './point';
import mod from '../helpers/resize-mod';
import C from '../constants';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
require('../../css/blocks/curve');

const CLASSES = require('../../css/blocks/curve.postcss.css.json');
class Curve extends Component {
  render () {
    const {state}   = this.props,
          {path}    = state.points.present,
          styles    = this._getStyle( state ),
          points    = this._renderPoints( state ),
          segments  = this._renderSegments( state );

    return <div className={CLASSES['curve']}>
              <div  className={ CLASSES['curve__background']}
                    style={styles.background} />
              <div  className={ CLASSES['curve__svg-wrapper']}
                    style={styles.transform}>

                { points }

                <svg  height={ C.CURVE_SIZE }
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      id="js-svg"
                      class={ CLASSES['curve__svg'] }>

                  <path d={path}
                        stroke="#000000"
                        stroke-opacity="0.35"
                        stroke-width="4"
                        vector-effect="non-scaling-stroke"
                        transform="translate(.75,.75)"
                        fill="none" />

                  <g id="js-segments"> { segments } </g>

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
    const pointsData = state.points.present.points,
          points     = [],
          len        = pointsData.length;

    for (var i = 0; i < len; i++) {
      points.push(
        <Point point={ pointsData[i] } state={state} index={i} pointsCount={len} />
        );
    }

    return points;
  }

  _renderSegments (state) {
    const {segments}  = state.points.present,
          domSegments = [];

    for (var i = 0; i < segments.length; i++) {
      const segment = segments[i];
      domSegments.push(
        <path d={segment.segmentString}
              data-index={segment.index}
              stroke="white"
              fill="none"
              stroke-width=""
              vector-effect="non-scaling-stroke"
              class={CLASSES['curve__svg-segment']}
              />
      );
    }

    return domSegments;
  }

  // _renderSegment ( index, string) {
  //   return <path
  //           d={string}
  //           data-index={index}
  //           stroke="white"
  //           fill="none"
  //           stroke-width=""
  //           vector-effect="non-scaling-stroke"
  //           class={CLASSES['curve__svg-segment']}
  //           />;
  // }


  componentDidMount () {
    const {store} = this.context;

    const el = this.base.querySelector('#js-segments'),
          mc = propagating(new Hammer.Manager(el));

    // mc.add(new Hammer.Pan({ threshold: 0 }));
    mc.add(new Hammer.Tap);

    mc
      .on('tap', (e) => {
        const ev     = e.srcEvent,
              target = ev.target;
        // handle paths only
        if ( target.tagName.toLowerCase() !== 'path' ) { return; }
        // coordinates
        const x  = ev.offsetX,
              y  = ev.offsetY*C.CURVE_PERCENT,
              index = parseInt(target.getAttribute('data-index')) + 1;

        store.dispatch({
          type:      'POINT_ADD',
          data:      { point: { x, y }, index },
          isRecord:  true
        });

        store.dispatch({
          type: 'POINT_SELECT',
          data: { index, type: 'straight' }
        });

        e.stopPropagation();
    });

    const svg   = this.base.querySelector('#js-svg'),
          svgMc = propagating(new Hammer.Manager(svg));

    svgMc.add(new Hammer.Tap);

    svgMc
      .on('tap', (e) => { store.dispatch({ type: 'POINT_DESELECT_ALL' }); });

  }
}

export default Curve;
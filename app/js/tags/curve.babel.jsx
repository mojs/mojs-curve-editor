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
    const {state} = this.props,
          styles  = this._getStyle( state ),
          points  = this._renderPoints( state ),
          {path, segments} = this._getPath( state );

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

                  <g id="js-segments">
                    { segments }
                  </g>

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

  _getPath (state) {
    const pointsData = state.points.present;

    let path     = '',
        segments = [];

    for (let index = 0; index < pointsData.length-1; index++) {
      const point     = pointsData[index],
            nextPoint = pointsData[index+1];

      const segment = this._getSegment( point, nextPoint, index );
      path += segment.string;
      segments.push(this._renderSegment(index, segment.segmentString));
    }

    return { path, segments };
  }

  _renderSegment ( index, string) {
    return <path
            d={string}
            data-index={index}
            stroke="white"
            fill="none"
            stroke-width=""
            vector-effect="non-scaling-stroke"
            class={CLASSES['curve__svg-segment']}
            />;
  }

  _getSegment (point, nextPoint, i) {
    if ( !nextPoint ) { return 1; }

    let string = '',
        segmentString = '';

    const x = point.x + point.tempX,
          y = point.y + point.tempY,
          xNext = nextPoint.x + nextPoint.tempX,
          yNext = nextPoint.y + nextPoint.tempY;

    const part1 = `M${x}, ${y/C.CURVE_PERCENT} `;
    if ( i === 0 ) { string += part1 }
    segmentString += part1;

    const part2 = this._getPoint( point, 2 );
    string += part2;
    segmentString += part2;

    const part3 = this._getPoint( nextPoint, 1 );
    string += part3;
    segmentString += part3;

    const part4 = `${xNext}, ${yNext/C.CURVE_PERCENT} `;
    string += part4;
    segmentString += part4;

    return { string, segmentString };
  }
  _getPoint (point, handleIndex = 1) {
    const x      = point.x + point.tempX,
          y      = point.y + point.tempY,
          handle = point[`handle${handleIndex}`];

    const CHAR = ( handleIndex === 2 ) ? 'C' : '';
    if ( point.type !== 'straight' ) {
      const handleCoords = angleToPoint( handle.angle, handle.radius );
      return `${CHAR}${x + handleCoords.x/C.CURVE_PERCENT}, ${(y + handleCoords.y)/C.CURVE_PERCENT} `;
    } else {
      return `${CHAR}${x}, ${y/C.CURVE_PERCENT} `;
    }
  }

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
          data:      { x, y, index },
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
import { h, Component } from 'preact';
import angleToPoint from '../helpers/angle-to-point';
import ProgressLine from './progress-line';
import Pattern from './pattern';
import Ruler from './ruler';
import Point from './point';
import mod from '../helpers/resize-mod';
import C from '../constants';
import Hammer from 'hammerjs';
import propagating from '../vendor/propagating';
require('../../css/blocks/curve');

const CLASSES = require('../../css/blocks/curve.postcss.css.json');
class Curve extends Component {
  render () {
    const {state}   = this.props,
          {path}    = state.points.present,
          styles    = this._getStyle( state ),
          points    = this._renderPoints( state ),
          segments  = this._renderSegments( state ),
          progressLines = this._renderProgressLines( state );

    const curveHeight = this._getCurveHeight();
    return <div className={this._getClassName()} data-component="curve">
              <div  id="js-background"
                    className={ CLASSES['curve__background']}
                    style={styles.background}>

                <Pattern styles={styles} />

              </div>

              { progressLines }

              <div  className={ CLASSES['curve__svg-wrapper']}
                    style={ styles.transform }>

                <Ruler />
                <Ruler type="right" />

                { points }

                <svg  height={ C.CURVE_SIZE }
                      viewBox={`0 0 100 ${curveHeight}`}
                      preserveAspectRatio="none"
                      id="js-svg"
                      class={ CLASSES['curve__svg'] }>

                  <path d={ path }
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

  _getClassName() {
    const {state}    = this.props;
    const {controls} = state;

    const minClass = controls.isMinimize ? CLASSES['is-minimized'] : '' ;
    return `${CLASSES['curve']} ${minClass}`;
  }

  _getCurveHeight () {
    const {state, options} = this.props;
    const {resize} = state;
    if (!state.controls.isMinimize) { return 100; }

    return C.CURVE_SIZE*4.28;
  }

  _getStyle(state) {
    const {resize} = state;
    let {temp_top, temp_bottom, temp_right, panTempY} = resize;
    let height = C.CURVE_SIZE - (temp_top + resize.top)
                              + (temp_bottom + resize.bottom);

    panTempY   += resize.panY;
    temp_top   += resize.top - panTempY;
    temp_right += resize.right;

    const yShift = (state.controls.isMinimize)
      ? -(temp_top/C.CURVE_SIZE) * (20/(height/C.CURVE_SIZE))
      : -temp_top;

    const scaleX = (C.CURVE_SIZE + Math.max(temp_right,0))/C.CURVE_SIZE;
    const background = `width: ${C.CURVE_SIZE*scaleX}px;`,
          transform  = `transform: translate(0px, ${yShift}px)`;

    return {
      transform: `${mojs.h.prefix.css}${transform}; ${transform};`,
      background,
      height,
      svgTop: temp_top
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

  _renderProgressLines ( state ) {
    const {progressLines} = state,
          {lines}         = progressLines,
          renderedLines   = [];

    for (var i = lines.length-1; i >= 0; i--) {
      const line = lines[i];
      renderedLines.push(<ProgressLine {...line} />);
    }

    return renderedLines;
  }

  _updateDomProgressLines () {
    const {progressLines} = this.props;
    // DO NOT MUTATE THE ARRAY TO PREVENT LOOSING THE LINK TO IT
    progressLines.length = 0;

    const lines = this.base.querySelectorAll('[data-component="progress-line"]');
    for (var i = 0; i < lines.length; i++) {
      progressLines[i] = lines[i];
    }
  }

  componentDidUpdate () { this._updateDomProgressLines(); }

  componentWillMount () {
    this._isFirefox = (navigator.userAgent.indexOf("Firefox") > -1);
  }

  componentDidMount () {
    this._updateDomProgressLines();

    const {store} = this.context,
          el = this.base.querySelector('#js-segments'),
          mc = propagating(new Hammer.Manager(el));


    // mc.add(new Hammer.Pan({ threshold: 0 }));
    mc.add(new Hammer.Tap);

    mc
      .on('tap', (e) => {
        const {state} = this.props;
        const ev      = e.srcEvent;
        const target  = ev.target;
        // handle paths only
        if ( target.tagName.toLowerCase() !== 'path' ) { return; }
        // coordinates
        let x  = ev.offsetX;
        let y  = ev.offsetY;
        let index = parseInt(target.getAttribute('data-index')) + 1;

        // normalize for FF issue - it calculates
        // events regarding `viewBox` of `svg` tag
        if (!this._isFirefox) { x /= state.resize.scalerX; }
        else {
          y *= C.CURVE_PERCENT;
          x -= 1;
          y -= 1;
        }

        this._isFirefox

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
          svgMc = propagating(new Hammer.Manager(this.base));

    svgMc.add(new Hammer.Tap);
    svgMc.add(new Hammer.Pan);

    svgMc
      .on('tap', (e) => {
        store.dispatch({ type: 'POINT_DESELECT_ALL' });
      })
      .on('pan', (e) => {
        store.dispatch({ type: 'EDITOR_PAN', data: e.deltaY });
      })
      .on('panend', (e) => {
        store.dispatch({ type: 'EDITOR_PAN_END', data: e.deltaY });
      });

  }
}

export default Curve;

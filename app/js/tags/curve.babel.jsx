import { h, Component } from 'preact';
import angleToPoint from '../helpers/angle-to-point';
import ProgressLine from './progress-line';
import Ruler from './ruler';
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
          segments  = this._renderSegments( state ),
          progressLines = this._renderProgressLines( state );

    return <div className={ CLASSES['curve'] }>
              <div  id="js-background"
                    className={ CLASSES['curve__background']}
                    style={ styles.background }>
                <svg preserveAspectRatio="none" height={`${styles.height}px`} viewBox={`0 0 ${350+Math.random()*0.0001} ${styles.height}`}>
                  <pattern id="rect-paper" x="0" y={`${-styles.svgTop}`} height="350" width="350" patternUnits="userSpaceOnUse">
                    <g id="Group" transform="translate(-1.000000, 0.000000)" stroke="#FFFFFF" stroke-width="1" fill="none">
                        <path vector-effect="non-scaling-stroke" d="M333.497821,350.501088 L333.497821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M315.997821,350.501088 L315.997821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M298.497821,350.501088 L298.497821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M280.997821,350.501088 L280.997821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M245.997821,350.501088 L245.997821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M228.497821,350.501088 L228.497821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M210.997821,350.501088 L210.997821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M193.497821,350.501088 L193.497821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M159.372821,350.501088 L159.372821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M141.872821,350.501088 L141.872821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M124.372821,350.501088 L124.372821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M106.872821,350.501088 L106.872821,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M71.8728207,350.501088 L71.8728207,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M54.3728207,350.501088 L54.3728207,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M36.8728207,350.501088 L36.8728207,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M19.3728207,350.501088 L19.3728207,0.501088302" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,19.0021793 L1.0010883,19.0021793" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,36.5021793 L1.0010883,36.5021793" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,54.0021793 L1.0010883,54.0021793" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,71.5021793 L1.0010883,71.5021793" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,106.502179 L1.0010883,106.502179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,124.002179 L1.0010883,124.002179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,141.502179 L1.0010883,141.502179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,159.002179 L1.0010883,159.002179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,193.127179 L1.0010883,193.127179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,210.627179 L1.0010883,210.627179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,228.127179 L1.0010883,228.127179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,245.627179 L1.0010883,245.627179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,280.627179 L1.0010883,280.627179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,298.127179 L1.0010883,298.127179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,315.627179 L1.0010883,315.627179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M351.001088,333.127179 L1.0010883,333.127179" opacity="0.25"></path>
                        <path vector-effect="non-scaling-stroke" d="M88.0641352,1 L88.0641352,351" id="path8215" opacity="0.5"></path>
                        <path vector-effect="non-scaling-stroke" d="M175.12827,1 L175.12827,351" id="path8215" opacity="0.5"></path>
                        <path vector-effect="non-scaling-stroke" d="M262.192406,1 L262.192406,351" id="path8215" opacity="0.5"></path>
                        <path vector-effect="non-scaling-stroke" d="M350.563591,88.0646793 L0.563591022,88.0646793" id="path8215" opacity="0.5"></path>
                        <path vector-effect="non-scaling-stroke" d="M350.563591,175.564679 L0.563591022,175.564679" id="path8215" opacity="0.5"></path>
                        <path vector-effect="non-scaling-stroke" d="M350.563591,263.064679 L0.563591022,263.064679" id="path8215" opacity="0.5"></path>
                        <rect id="rect10078" opacity="0.75" x="0.872817955" y="1" width="350" height="350"></rect>
                      </g>
                    </pattern>

                  <rect width="350" height={styles.height} fill="url(#rect-paper)" />
                  </svg>

              </div>

              { progressLines }
              
              <div  className={ CLASSES['curve__svg-wrapper']}
                    style={ styles.transform }>

                <Ruler />
                <Ruler type="right" />

                { points }

                <svg  height={ C.CURVE_SIZE }
                      viewBox="0 0 100 100"
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

  _getStyle(state) {
    const {resize} = state;
    let {temp_top, temp_bottom, temp_right, panTempY} = resize;
    let height = C.CURVE_SIZE - (temp_top + resize.top)
                              + (temp_bottom + resize.bottom);

    panTempY   += resize.panY;

    temp_top   += resize.top - panTempY;
    temp_right += resize.right;

    const scaleX = (C.CURVE_SIZE + Math.max(temp_right,0))/C.CURVE_SIZE;
    const scale = `width: ${C.CURVE_SIZE*scaleX}px`,
          bgTransform = `${scale};`,
          background = `background-position: 0 ${-temp_top - 1}px; ${bgTransform}`,
          transform  = `transform: translate(0px, ${-temp_top}px)`;

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
        const x  = ev.offsetX/state.resize.scalerX,
              y  = ev.offsetY,
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
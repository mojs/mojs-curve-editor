
require('./point');

<curve class={ this.CLASSES['curve']} style={this.styles.background}>
  <div class={ this.CLASSES['curve__svg-wrapper']} style={this.styles.transform}>

    <point
          each={ point, _index in points }
          points-count={parent.points.length} />

    <svg  height="358"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class={ this.CLASSES['curve__svg'] }>

      <path d={this.path}
            stroke="#000000"
            stroke-opacity="0.35"
            stroke-width="4"
            vector-effect="non-scaling-stroke"
            transform="translate(.75,.75)"
            fill="none" />

      <g id="js-segments">
          <path
            each={ this.segments }
            d={str}
            data-index={index}
            stroke="white"
            fill="none"
            stroke-width=""
            vector-effect="non-scaling-stroke"
            class={this.CLASSES['curve__svg-segment']}
            />
      </g>

      <!-- <path id="js-main-path"
            class={ this.CLASSES['curve__svg-path'] }
            d={this.path}
            stroke="#ffffff"
            stroke-width="3"
            vector-effect="non-scaling-stroke"
            fill="none" /> -->

      <!-- <path d={this.path + ' L100,100 z'}
            stroke="none"
            vector-effect="non-scaling-stroke"
            transform="translate(.5,.5)"
            fill="none" /> -->

    </svg>
  </div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/curve.postcss.css.json');
    require('../../css/blocks/curve');

    import store from '../store';
    import mod from '../helpers/resize-mod';
    import C from '../constants';
    import angleToPoint from '../helpers/angle-to-point';

    const getPoint = (point, handleIndex = 1) => {
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

    const getSegment = (point, nextPoint, i) => {
      if ( !nextPoint ) { return 1; }

      let str = '';
      let segmentStr = '';

      const x = point.x + point.tempX,
            y = point.y + point.tempY,
            xNext = nextPoint.x + nextPoint.tempX,
            yNext = nextPoint.y + nextPoint.tempY;

      const part1 = `M${x}, ${y/C.CURVE_PERCENT} `;
      if ( i === 0 ) { str += part1 }
      segmentStr += part1;

      const part2 = getPoint( point, 2 );
      str += part2;
      segmentStr += part2;

      const part3 = getPoint( nextPoint, 1 );
      str += part3;
      segmentStr += part3;

      const part4 = `${xNext}, ${yNext/C.CURVE_PERCENT} `;
      str += part4;
      segmentStr += part4;

      return { str, segmentStr };
    }

    const getPath = () => {
      let str = '';
      this.segments = [];
      for (let i = 0 ; i < this.points.length-1; i++) {
        const point     = this.points[i],
              nextPoint = this.points[i+1];

        const segment = getSegment( point, nextPoint, i );
        str += segment.str;
        console.log(i);
        this.segments.push({ index: i, str: segment.segmentStr });
      }

      this.path = str;
    }

    this.getStyle = () => {
      const {resize} = this.state;
      let {temp_top} = resize;

      temp_top += resize.top;

      if (C.CURVE_SIZE - temp_top < C.CURVE_SIZE) { temp_top = 0; }
      temp_top = mod( temp_top, -1 );

      const background = `background-position: 0 ${-temp_top - 1}px`;
      const transform  = `transform: translate(0px, ${-temp_top}px)`;

      return {
        background,
        transform: `${mojs.h.prefix.css}${transform}; ${transform};`
      };
    }

    const getState  = () => { this.state  = store.getState(); }
    const getPoints = () => { this.points = this.state.points.present; }
    const getStyles = () => { this.styles = this.getStyle(); }
    const get = () => {
      getState(); getPoints(); getPath(); getStyles();
    }

    get();
    store.subscribe( () => { get(); this.update(); });

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';

    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root.querySelector('#js-segments')))
        .on('tap', (e) => {
          const ev     = e.srcEvent,
                target = ev.target;
          // handle paths only
          if ( target.tagName.toLowerCase() !== 'path' ) { return; }
          // coordinates
          const x  = ev.offsetX,
                y  = ev.offsetY*C.CURVE_PERCENT,
                index = parseInt(target.getAttribute('data-index'));

          console.log(index);

          store.dispatch({
            type:      'POINT_ADD',
            data:      { x, y, index },
            isRecord:  true
          });

          store.dispatch({
            type: 'POINT_SELECT',
            data: { index }
          });

          e.stopPropagation();

        });
    });

  </script>
</curve>


require('./point');

<curve class={ this.CLASSES['curve']} style={this.styles.background}>
  <div class={ this.CLASSES['curve__svg-wrapper']} style={this.styles.transform}>

    <point each={ point, _index in points }></point>

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
            d={string}
            data-index={index}
            stroke="white"
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

    const getPath = () => {
      let str = '';
      for (let i = 0 ; i < this.points.length; i++) {
        const point = this.points[i],
              x = point.x + point.tempX,
              y = point.y + point.tempY;
        if ( i ===  0) { str += `M${x}, ${y/3.58} `; }
        else { str += `L${x}, ${y/3.58} ` ; }
      }
      this.path = str;
    }

    this.getStyle = () => {
      const {resize} = this.state;
      let {temp_top} = resize;

      temp_top += resize.top;

      if (358 - temp_top < 358) { temp_top = 0; }
      temp_top = mod( temp_top, -1 );

      const background = `background-position: 0 ${-temp_top - 1}px`;
      const transform  = `transform: translate(0px, ${-temp_top}px)`;

      return {
        background,
        transform: `${mojs.h.prefix.css}${transform}; ${transform};`
      };
    }

    const getSegments = () => {
      this.segments = [];
      for (var i = 1; i < this.points.length; i++) {
        const pPoint = this.points[i-1],
              point  = this.points[i],
              px = pPoint.x + pPoint.tempX,
              py = pPoint.y + pPoint.tempY,
              x  = point.x + point.tempX,
              y  = point.y + point.tempY;

        // const startChar = (i === 1) ? 'M' : 'L'
        this.segments.push({
          index:  i,
          string: `M${px}, ${py/3.58} L${x}, ${y/3.58}`
        });
      }
    }

    const getState  = () => { this.state  = store.getState(); }
    const getPoints = () => { this.points = this.state.points.present; }
    const getStyles = () => { this.styles = this.getStyle(); }
    const get = () => {
      getState(); getPoints(); getSegments(); getPath(); getStyles();
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
                y  = ev.offsetY*3.58,
                index = parseInt(target.getAttribute('data-index'));

          store.dispatch({
            type:     'POINT_ADD',
            data:     { x, y, index },
            isRecord: true
          });

        });
    });

  </script>
</curve>

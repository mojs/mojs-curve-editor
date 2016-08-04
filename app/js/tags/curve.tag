
require('./point');

<curve class={ this.CLASSES['curve']} style={this.styles.background}>
  <div class={ this.CLASSES['curve__svg-wrapper']} style={this.styles.transform}>

    <point each={ point, _index in points }></point>

    <svg  height="358"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          class={ this.CLASSES['curve__svg'] }>
      <path d={this.path}
            stroke="#ffffff"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            fill="none">
      </path>
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

    const getState = () => { this.state = store.getState(); }

    const getPoints = () => { this.points = this.state.points.present; }

    const getStyles = () => { this.styles = this.getStyle(); }
    const get = () => {
      getState();
      getPoints();
      getPath();
      getStyles();
    }

    get();
    store.subscribe( () => { get(); this.update(); });

  </script>
</curve>
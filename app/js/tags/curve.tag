
require('./point');

<curve class={ this.CLASSES['curve']} style={this.getStyle()}>
  <div class={ this.CLASSES['curve__svg-wrapper']} style={this.getSvgStyle()}>

    <point each={ point, _index in points }></point>

    <svg  width="358" height="358" viewBox="0 0 100 100"
          class={ this.CLASSES['curve__svg'] }>
      <!-- <path d="M0.467543436,99.4306528 L8.61335666,54.5691059 L15.6069015,117.29232 L29.1234315,-10.9721887 L40.3444739,114.711028 L48.6833374,-11.7964225 L62.6312138,99.9449505 L85.0069377,112.263212 C85.0069377,112.263212 73.419402,-20.3456806 83.4927003,-22.3523468 L99.5792109,100.263182" stroke="#ffffff" stroke-width="1" fill="none"></path> -->
    </svg>
  </div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/curve.postcss.css.json');
    require('../../css/blocks/curve');

    import store from '../store';
    import mod from '../helpers/resize-mod';

    const state = store.getState().present;
    const {points} = state;
    this.points = points;

    store.subscribe(this.update.bind(this));

    this.getSvgStyle = () => {
      const {resize} = state;
      let {temp_top} = resize;

      temp_top += resize.top;

      if (358 - temp_top < 358) { temp_top = 0; }
      temp_top = mod( temp_top, -1 );

      const transform = `transform: translate(0px, ${-temp_top}px)`;

      return `${mojs.h.prefix.css}${transform}; ${transform};`;
    }

    this.getStyle = () => {
      const state = store.getState().present;
      let {temp_top} = state;

      temp_top += state.top;

      if (358 - temp_top < 358) { temp_top = 0; }
      temp_top = mod( temp_top, -1 );

      const background = `background-position: 0 ${-temp_top - 1}px`;
      return `${background};`;
    }

  </script>
</curve>
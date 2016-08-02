
<curve class={ this.CLASSES['curve'] + ' ' + (opts.adc || '')  } style={this.getStyle()}>

  <div style={this.getSvgStyle()}>
    <svg  width="358" height="358" viewBox="0 0 100 100"
          class={ this.CLASSES['curve__svg'] }>
      <!-- <path d="M0.467543436,99.4306528 L8.61335666,54.5691059 L15.6069015,117.29232 L29.1234315,-10.9721887 L40.3444739,114.711028 L48.6833374,-11.7964225 L62.6312138,99.9449505 L85.0069377,112.263212 C85.0069377,112.263212 73.419402,-20.3456806 83.4927003,-22.3523468 L99.5792109,100.263182" stroke="#ffffff" stroke-width="1" fill="none"></path> -->
    </svg>
  </div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/curve.postcss.css.json');
    require('../../css/blocks/curve');

    import store from '../store';

    store.subscribe(this.update.bind(this));

    this.getSvgStyle = () => {
      const state = store.getState().present;
      let {tempResize_top} = state;

      if (358 - tempResize_top < 358) { tempResize_top = 0; }

      const mod = Math.abs(tempResize_top % 358);
      const div = parseInt(tempResize_top / 358);
      if (mod < 15 ) { tempResize_top = div*358; }
      else if ( mod > 358 - 15 ) { tempResize_top = -(div+1)*358; }

      const transform = `transform: translate(0px, ${-tempResize_top}px)`;

      return `${transform}; ${transform};`;
      // return `${mojs.h.prefix.css}${transform}; ${transform};`;
    }

    this.getStyle = () => {
      const state = store.getState().present;
      let {tempResize_top} = state;

      if (358 - tempResize_top < 358) { tempResize_top = 0; }

      const mod = Math.abs(tempResize_top % 358);
      const div = parseInt(tempResize_top / 358);
      if (mod < 15 ) { tempResize_top = div*358; }
      else if ( mod > 358 - 15 ) { tempResize_top = -(div+1)*358; }

      const background = `background-position: 0 ${-tempResize_top}px`;

      return `${background};`;
    }

  </script>
</curve>
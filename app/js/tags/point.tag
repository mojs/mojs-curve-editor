<point class={this.CLASSES['point']} style={this.getStyle()}>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/point.postcss.css.json');
    require('../../css/blocks/point');

    import store from '../store';
    store.subscribe(this.update.bind(this));
    const {clamp} = mojs.h;

    this.getStyle = () => {
      const {resize}  = store.getState(),
            x         = clamp(this.point.x + this.point.tempX, 0, 100),
            cleanX    = x * resize.scalerX;
      
      let y = this.point.y + this.point.tempY;

      const translate = `transform: translate(${cleanX}px, ${y}px)`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    import mod from '../helpers/resize-mod';

    const getTempX = (e) => {
      const {resize} = store.getState();

      // if point is not locked to x axes ->
      // calculate delta regarding scaler
      if ( this.point.isLockedX ) { return 0 };
        
      const x = e.deltaX/resize.scalerX;
      if ( this.point.x + x < 0 ) { return 0 - this.point.x; }
      else if ( this.point.x + x > 100 ) { return 100 - this.point.x; }
      return x;
    }

    const getY = (e) => {
      const {resize} = store.getState();
      const y = this.point.y + e.deltaY
      // clamp y to the size of curve
      return clamp( y, resize.top, 358 + resize.bottom ); 
    }

    // get y delta reagarding curve bounds
    const getTempY = (e) => {
      let {resize} = store.getState(),
            y = this.point.y + e.deltaY;

      if ( y < resize.top ) { return (resize.top - this.point.y); }
      if ( y > 358 + resize.bottom ) { return 358 + resize.bottom - this.point.y }
      return e.deltaY;
    }

    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (e) => {
          store.dispatch({
            type: 'POINT_TRANSLATE',
            data: { x: getTempX(e), y: getTempY(e), index: this._index }
          });
          e.stopPropagation();
        })
        .on('panend', (e) => {
          // reset temporary deltas
          store.dispatch({ type: 'POINT_TRANSLATE', data: { x: 0, y: 0, index: this._index } });
          // fire translate end and save it to the store
          store.dispatch({
            type: 'POINT_TRANSLATE_END',
            data: {
              x: this.point.x + getTempX(e),
              y: getY(e),
              index: this._index
            },
            isRecord: true
          });

          e.stopPropagation();
        })
    });


  </script>
</point>
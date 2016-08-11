require('./little-handle');

<point class={this.getClass()} style={this.getStyle()}>

  <little-handle
    each={this.handles}
    parent-index={ parent._index }
    type={ parent.point.type }
    />

  <div class={ this.CLASSES['point__touch'] } id="js-point-touch"></div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/point.postcss.css.json');
    require('../../css/blocks/point');

    import store from '../store';
    import C     from '../constants';
    const {clamp} = mojs.h;

    this.getHandles = () => {
      this.handles = [];
      // dont set the handle1 for start point
      (this._index !== 0) && this.handles.push(this.point.handle1);

      // dont set the handle2 for end point
      (this._index !== this.opts.pointsCount-1) && this.handles.push(this.point.handle2);
    }

    this.resize = this.opts.resize;
    this.getHandles();
    store.subscribe(() => {
      this.resize = this.opts.resize;
      this.getHandles(); this.update();
    });

    this.getClass = () => {
      const isSelected = (this.point.isSelected)
                              ? this.CLASSES['is-selected'] : '';
      const isHideHandles = (this.point.type === 'straight')
                              ? this.CLASSES['is-hide-handles'] : '';
      
      return `${this.CLASSES['point']} ${isSelected} ${isHideHandles}`;
    }

    this.getStyle = () => {
      const x         = clamp(this.point.x + this.point.tempX, 0, 100),
            cleanX    = x * this.resize.scalerX;
      
      let y = this.point.y + this.point.tempY;

      const translate = `transform: translate(${cleanX}px, ${y-1}px)`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    import mod from '../helpers/resize-mod';
    import roundTo from '../helpers/round-to';

    const getTempX = (e) => {

      // if point is not locked to x axes ->
      // calculate delta regarding scaler
      if ( this.point.isLockedX ) { return 0 };
        
      const x = e.deltaX/this.resize.scalerX;
      if ( this.point.x + x < 0 ) { return 0 - this.point.x; }
      else if ( this.point.x + x > 100 ) { return 100 - this.point.x; }
      return roundTo( x, 5, 1.5 );
    }

    const getY = (e) => {
      const y = this.point.y + e.deltaY
      // clamp y to the size of curve
      return clamp( y, this.resize.top, C.CURVE_SIZE + this.resize.bottom ); 
    }

    // get y delta reagarding curve bounds
    const getTempY = (e) => {
      let y = this.point.y + e.deltaY;

      let returnValue = y;
      if ( y < this.resize.top ) {
        returnValue = (this.resize.top - this.point.y);
      } else if ( y > C.CURVE_SIZE + this.resize.bottom ) {
        returnValue = C.CURVE_SIZE + this.resize.bottom - this.point.y;
      } else {
        returnValue = e.deltaY;
      }

      return roundTo( returnValue, 5*C.CURVE_PERCENT, 2*C.CURVE_PERCENT );
    }

    this.on('mount', () => {

      const el = this.root.querySelector('#js-point-touch');
      const mc = propagating(new Hammer.Manager(el));
      mc.add(new Hammer.Pan({ threshold: 0 }));
      mc
        .on('pan', (e) => {
          console.time('point translate');
          store.dispatch({
            type: 'POINT_TRANSLATE',
            data: { x: getTempX(e), y: getTempY(e), index: this._index }
          });
          console.timeEnd('point translate');
          e.stopPropagation();
        })
        .on('panend', (e) => {
          // fire translate end and save it to the store
          store.dispatch({
            type: 'POINT_TRANSLATE_END',
            data: this._index,
            isRecord: true
          });

          e.stopPropagation();
        })
        .on('tap', (e) => {
          store.dispatch({
            type: 'POINT_SELECT',
            data: {
              index:      this._index,
              type:       this.point.type,
              isDeselect: !e.srcEvent.shiftKey
            }

          });
          e.stopPropagation();
        });
    });


  </script>
</point>
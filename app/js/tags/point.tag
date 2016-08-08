require('./little-handle');

<point class={this.getClass()} style={this.getStyle()}>

  <little-handle
    each={this.handles}
    parent-index={ parent._index }
    type={ parent.point.type }
    />

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
    
    this.getHandles();
    store.subscribe(() => {
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
      // console.log(this.point.tempX, this.point.handle1, this.point.handle2);
      const {resize}  = store.getState(),
            x         = clamp(this.point.x + this.point.tempX, 0, 100),
            cleanX    = x * resize.scalerX;
      
      let y = this.point.y + this.point.tempY;

      const translate = `transform: translate(${cleanX}px, ${y-1}px)`;
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
      return clamp( y, resize.top, C.CURVE_SIZE + resize.bottom ); 
    }

    // get y delta reagarding curve bounds
    const getTempY = (e) => {
      let {resize} = store.getState(),
            y = this.point.y + e.deltaY;

      if ( y < resize.top ) { return (resize.top - this.point.y); }
      if ( y > C.CURVE_SIZE + resize.bottom ) { return C.CURVE_SIZE + resize.bottom - this.point.y }
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
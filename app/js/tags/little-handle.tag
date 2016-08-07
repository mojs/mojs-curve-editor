


<little-handle class={ this.CLASSES['little-handle'] } style={this.getStyle()}>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/little-handle.postcss.css.json');
    require('../../css/blocks/little-handle');
    import store from '../store';
    store.subscribe(() => {
      this.update();
    });

    const angleToPoint = (angle, radius) => {
      return mojs.h.getRadialPoint({ angle, radius, center: { x: 0, y: 0 } })
    }

    const anglePointToAngle = (x, y) => {
      let   radius  = Math.sqrt( x*x + y*y ),
            angle   = Math.atan( y/x ) * (180/Math.PI) - 90;
      if ( x > 0 ) { angle = angle - 180 };

      return { radius, angle };
    }

    this.getStyle = () => {
      const point = angleToPoint( this.angle, this.radius );

      const translate = `transform: translate(${point.x}px, ${point.y}px) rotate(${this.angle}deg)`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (e) => {
          const point = angleToPoint( this.angle, this.radius ),
                newX  = point.x + e.deltaX,
                newY  = point.y + e.deltaY;

          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index: this.index,
              parentIndex: this.opts.parentIndex,
              ...anglePointToAngle( newX, newY )
            }
          });

          e.stopPropagation();
        })
        .on('panend', (e) => {
        //   // reset temporary deltas
        //   store.dispatch({ type: 'POINT_TRANSLATE', data: { x: 0, y: 0, index: this._index } });
        //   // fire translate end and save it to the store
        //   store.dispatch({
        //     type: 'POINT_TRANSLATE_END',
        //     data: {
        //       x: this.point.x + getTempX(e),
        //       y: getY(e),
        //       index: this._index
        //     },
        //     isRecord: true
        //   });

          e.stopPropagation();
        })
        // .on('tap', (e) => {
        //   store.dispatch({
        //     type: 'POINT_SELECT',
        //     data: {
        //       index:      this._index,
        //       type:       this.point.type,
        //       isDeselect: !e.srcEvent.shiftKey
        //     }

        //   });
        //   e.stopPropagation();
        // });
    });

  </script>

</little-handle>
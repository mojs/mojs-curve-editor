


<little-handle class={ this.CLASSES['little-handle'] }>

  <div
    class={ this.CLASSES['little-handle__point'] }
    style={this.getPointStyle()}></div>

  <div
    class={ this.CLASSES['little-handle__line'] }
    style={this.getLineStyle()}></div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/little-handle.postcss.css.json');
    require('../../css/blocks/little-handle');
    import store from '../store';
    import angleToPoint from '../helpers/angle-to-point';
    store.subscribe(() => { this.update(); });

    const anglePointToAngle = (x, y) => {
      let   radius  = Math.sqrt( x*x + y*y ),
            angle   = Math.atan( y/x ) * (180/Math.PI) - 90;
      if ( x > 0 ) { angle = angle - 180 };

      return { radius, angle };
    }

    this.getPointStyle = () => {
      const point = angleToPoint( this.angle, this.radius );

      const translate = `transform: translate(${point.x}px, ${point.y}px) rotate(${this.angle}deg)`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    this.getLineStyle = () => {
      const point = angleToPoint( this.angle, this.radius );

      const translate = `transform: rotate(${this.angle}deg) scaleY(${this.radius})`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    this.on('mount', () => {
      // const mc = propagating(new Hammer.Manager(this.root));
      // mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (e) => {
          const point = angleToPoint( this.angle, this.radius ),
                newX  = point.x + e.deltaX,
                newY  = point.y + e.deltaY;

          const angle = anglePointToAngle( newX, newY );
          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index: this.index,
              parentIndex: this.opts.parentIndex,
              ...angle
            }
          });

          if ( this.opts.type === 'mirrored' ) {
            const index = (this.index === 1) ? 2 : 1;
            store.dispatch({
              type: 'HANDLE_TRANSLATE',
              data: {
                index,
                parentIndex: this.opts.parentIndex,
                radius: angle.radius,
                angle:  angle.angle - 180
              }
            });
          }

          if ( this.opts.type === 'asymmetric' ) {
            const index = (this.index === 1) ? 2 : 1;
            store.dispatch({
              type: 'HANDLE_TRANSLATE',
              data: {
                index,
                parentIndex: this.opts.parentIndex,
                angle:       angle.angle - 180,
                radius:      this.radius
              }
            });
          }

          e.stopPropagation();
        })
        .on('panend', (e) => { e.stopPropagation(); });
    });

  </script>

</little-handle>
<point class={this.CLASSES['point']} style={this.getStyle()}>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/point.postcss.css.json');
    require('../../css/blocks/point');

    import store from '../store';
    // store.subscribe(this.update.bind(this));

    this.getStyle = () => {
      const {resize}  = store.getState().present,
            x         = (this.point.x + this.point.tempX) * resize.scalerX,
            translate = `transform: translate(${x}px, ${this.point.y}px)`;

      // console.log(this.point.x + this.point.tempX, this.point.tempX);
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    import mod from '../helpers/resize-mod';

    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (e) => {
          store.dispatch({
            type: 'POINT_TRANSLATE',
            data: { 
                    x:      this.point.x + e.deltaX,
                    y:      this.point.y + e.deltaY,
                    index:  this._index
                  }
          });
          e.stopPropagation();
        })
        // .on('panend', (ev) => {
        //   const x = ev.deltaX,
        //         y = ev.deltaY,
        //         {translate} = store.getState().present.resize;

        //   this.x = this.y = 0;
        //   store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: translate.x + x, y: translate.y + y } })
        // });
    });


  </script>
</point>
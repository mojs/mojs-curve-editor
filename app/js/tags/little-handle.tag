
<little-handle class={ this.CLASSES['little-handle'] } style={this.getStyle()}>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/little-handle.postcss.css.json');
    require('../../css/blocks/little-handle');

    this.getStyle = () => {
      // const {resize}  = store.getState(),
      //       x         = clamp(this.point.x + this.point.tempX, 0, 100),
      //       cleanX    = x * resize.scalerX;
      
      // let y = this.point.y + this.point.tempY;
      const x = this.x + this.tempX,
            y = this.y + this.tempY;

      const translate = `transform: translate(${x}px, ${y}px)`;
      return `${mojs.h.prefix.css}${translate}; ${translate}`;
    }

  </script>

</little-handle>
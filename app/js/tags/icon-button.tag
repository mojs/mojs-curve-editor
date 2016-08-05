require('./icon');

<icon-button class={this.getClass()}>
  
  <icon shape={opts.shape}></icon>

  <script type="babel">
    const CLASSES = require('../../css/blocks/icon-button.postcss.css.json');
    require('../../css/blocks/icon-button');

    this.getClass = () => {
      const isCheck = (opts.isCheck) ? CLASSES['is-checked'] : '';
      return `${CLASSES['icon-button']} ${isCheck}`;
    }

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    if ( typeof opts.onTap === 'function' ) {
      this.on('mount', () => {
        var hammertime = propagating(new Hammer(this.root))
          .on('tap', (ev) => { opts.onTap( ev, opts ) });
      });
    }


  </script>

</icon-button>

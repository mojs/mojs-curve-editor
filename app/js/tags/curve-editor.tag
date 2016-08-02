require('./resize-handle');
require('./icons');
require('./icon');
require('./icon-button');
require('./curve');

<curve-editor class={this.CLASSES['curve-editor']} style={this.getStyle()}>
  <icons />

  <resize-handle type="top"></resize-handle>
  <resize-handle type="right"></resize-handle>
  <resize-handle type="bottom"></resize-handle>

  <div class={this.CLASSES['curve-editor__left']}>
    <icon-button shape="code"></icon-button>
    <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class={this.CLASSES['curve-editor__mojs-logo']}>
      <icon shape="mojs-logo" />
    </a>
  </div>

  <curve adc={this.CLASSES['curve-editor__right']} />
  
  <script type="babel">
    require('../../css/blocks/curve-editor');
    this.CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';

    const {store} = opts;
    store.subscribe(this.update.bind(this));

    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (ev) => {
          this.x = ev.deltaX;
          this.y = ev.deltaY;
          this.update();
        })
        .on('panend', (ev) => {
          const x = ev.deltaX,
                y = ev.deltaY,
                {translate} = store.getState().present;

          this.x = this.y = 0;
          store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: translate.x + x, y: translate.y + y } })
        });
    });

    this.getStyle = () => {
      const state = store.getState().present;
      let {tempResize_top} = state;

      if (358 - tempResize_top < 358) { tempResize_top = 0; }

      const mod = Math.abs(tempResize_top % 358);
      const div = parseInt(tempResize_top / 358);
      if (mod < 15 ) { tempResize_top = div*358; }
      else if ( mod > 358 - 15 ) { tempResize_top = -(div+1)*358; }

      const {translate} = state,
            height = `height: ${358 - tempResize_top}px`,
            x = (this.x || 0) + translate.x,
            y = (this.y || 0) + translate.y,
            transform = `transform: translate(${x}px, ${y + tempResize_top}px)`;

      console.log(mojs.h.prefix.css);
      return `${transform}; ${height}`;
      // return `${mojs.h.prefix.css}${transform}; ${transform}; ${height}`;
    }


  </script>

</curve-editor>
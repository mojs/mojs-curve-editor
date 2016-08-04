require('./resize-handle');
require('./icons');
require('./icon');
require('./icon-button');
require('./icon-divider');
require('./curve');

<curve-editor class={this.CLASSES['curve-editor']} style={this.getStyle()}>
  <icons />

  <div class={this.CLASSES['curve-editor__left']}>
    <icon-button shape="code"></icon-button>
    <icon-divider shape="divider"></icon-divider>
    <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class={this.CLASSES['curve-editor__mojs-logo']}>
      <icon shape="mojs-logo" />
    </a>
  </div>

<<<<<<< HEAD
  <curve adc={this.CLASSES['curve-editor__right']} />

=======
  <div class={this.CLASSES['curve-editor__right']}>
    <curve />
    <resize-handle type="top"></resize-handle>
    <resize-handle type="right"></resize-handle>
    <resize-handle type="bottom"></resize-handle>
  </div>

>>>>>>> 160ef2ef7c5f203d6f474a73062d6f86e7069387
  <script type="babel">
    require('../../css/blocks/curve-editor');
    this.CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';
    import mod from '../helpers/resize-mod';

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
      let {tempResize_bottom} = state;
      let {tempResize_right} = state;

      tempResize_top += state.resize_top;
      tempResize_bottom += state.resize_bottom;
      tempResize_right += state.resize_right;

      const X_SIZE = 411;
      const Y_SIZE = 378;

      // constrain min height
      if (Y_SIZE - tempResize_top < Y_SIZE) { tempResize_top = 0; }
      if (Y_SIZE + tempResize_bottom < Y_SIZE) { tempResize_bottom = 0; }
      if (X_SIZE + tempResize_right < X_SIZE) { tempResize_right = 0; }

      tempResize_top    = mod( tempResize_top, -1 );
      tempResize_bottom = mod( tempResize_bottom );
      // tempResize_right  = mod( tempResize_right );

      const {translate} = state,
            height = `height: ${Y_SIZE - tempResize_top + tempResize_bottom}px`,
            width  = `width: ${X_SIZE + tempResize_right}px`,
            x = (this.x || 0) + translate.x,
            y = (this.y || 0) + translate.y,
            transform = `transform: translate(${x}px, ${y + tempResize_top}px)`;

      return `${mojs.h.prefix.css}${transform}; ${transform}; ${width}; ${height};`;
    }


  </script>

</curve-editor>

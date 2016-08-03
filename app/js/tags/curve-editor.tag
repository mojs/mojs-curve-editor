require('./resize-handle');
require('./icons');
require('./icon');
require('./icon-button');
require('./curve');

<curve-editor class={this.CLASSES['curve-editor']} style={this.getStyle()}>
  <icons />

  <div class={this.CLASSES['curve-editor__left']}>
    <icon-button shape="code"></icon-button>
    <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class={this.CLASSES['curve-editor__mojs-logo']}>
      <icon shape="mojs-logo" />
    </a>
  </div>

  <div class={this.CLASSES['curve-editor__right']}>
    <curve />
    <resize-handle type="top"></resize-handle>
    <resize-handle type="right"></resize-handle>
    <resize-handle type="bottom"></resize-handle>
  </div>
  
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

      // constrain min height
      if (378 - tempResize_top < 378) { tempResize_top = 0; }
      if (378 + tempResize_bottom < 378) { tempResize_bottom = 0; }
      if (411 + tempResize_right < 411) { tempResize_right = 0; }

      console.log(tempResize_right);
      
      tempResize_top    = mod( tempResize_top, -1 );
      tempResize_bottom = mod( tempResize_bottom );
      tempResize_right  = mod( tempResize_right );

      const {translate} = state,
            height = `height: ${378 - tempResize_top + tempResize_bottom}px`,
            width  = `width: ${411 + tempResize_right}px`,
            x = (this.x || 0) + translate.x,
            y = (this.y || 0) + translate.y,
            transform = `transform: translate(${x}px, ${y + tempResize_top}px)`;

      return `${mojs.h.prefix.css}${transform}; ${transform}; ${width}; ${height};`;
    }


  </script>

</curve-editor>
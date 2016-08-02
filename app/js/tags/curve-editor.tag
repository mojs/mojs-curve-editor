require('../../css/blocks/curve-editor');
require('./icons');
require('./icon');
require('./icon-button');

var Hammer = require('hammerjs');

<curve-editor class={this.CLASSES['curve-editor']} style={this.getStyle()}>
  <icons />
  <div class={this.CLASSES['curve-editor__left']}>
    <icon-button shape="code"></icon-button>
    <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class={this.CLASSES['curve-editor__mojs-logo']}>
      <icon shape="mojs-logo" />
    </a>
  </div>
  <div class={this.CLASSES['curve-editor__right']}></div>
  
  <script type="babel">
    const {store} = opts;

    this.CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');
  
    store.subscribe(() => {
      this.update();
    });

    this.on('mount', () => {
      var hammertime = new Hammer(this.root, {});
      hammertime.on('pan', (ev) => {
        this.x = ev.deltaX;
        this.y = ev.deltaY;
        this.update();
      });
      hammertime.on('panend', (ev) => {
        const x = ev.deltaX,
              y = ev.deltaY,
              {translate} = store.getState().present;

        this.x = this.y = 0;
        store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: translate.x + x, y: translate.y + y } })
      });
    });

    this.getStyle = () => {
      const {translate} = store.getState().present;
      const x = this.x + translate.x,
            y = this.y + translate.y,
            transform = `transform: translate(${this.x + translate.x}px, ${this.y + translate.y}px)`;
      
      return `${transform} ${transform}`;

    }


  </script>

</curve-editor>
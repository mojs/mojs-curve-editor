require('../../css/blocks/curve-editor');
require('./icons');
require('./icon');
require('./icon-button');

<curve-editor class={this.CLASSES['curve-editor']}>
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
  
    store.subscribe(this.update.bind(this));
  </script>

</curve-editor>
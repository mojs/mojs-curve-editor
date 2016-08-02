
<icon class={this.CLASSES['icon'] + ' ' + (opts.adc || '') }>
  <svg viewBox="0 0 32 32">
    <use xlink:href="#{opts.shape}-shape"></use>
  </svg>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/icon.postcss.css.json');
    require('../../css/blocks/icon');
    // refresh the svg content due to the bug
    this.on('mount', () => { this.root.innerHTML = this.root.innerHTML; });
  </script>

</icon>
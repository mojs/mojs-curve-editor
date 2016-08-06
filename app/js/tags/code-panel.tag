

<code-panel class={ this.CLASSES['code-panel'] }>
  <div class={ this.CLASSES['code-panel__input-wrap'] }>
    <input class={ this.CLASSES['code-panel__input-field'] } type="text" readonly="readonly" value="M0,100 C0,100 12.0486221,-124.260309 24,99.7583642 C28.9933624,142.723104" />
  </div>

  <script type="babel">
    this.CLASSES = require('../../css/blocks/code-panel.postcss.css.json');
    require('../../css/blocks/code-panel');

    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';

    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (e) => { e.stopPropagation(); })
        .on('panend', (e) => { e.stopPropagation(); });
    });

  </script>

</code-panel>

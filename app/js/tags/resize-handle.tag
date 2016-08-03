<resize-handle class={ this.applyClass }>

  <icon shape="ellipsis" />

  <script type="babel">
    import store from '../store';
    import Hammer from 'hammerjs';
    import propagating from 'propagating-hammerjs';

    const {type}  = this.opts,
          CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');

    this.applyClass = `${CLASSES['resize-handle']} ${(opts.adc || '')}`;
    this.applyClass = `${this.applyClass} ${CLASSES['resize-handle--' + this.opts.type]}`
    require('../../css/blocks/resize-handle');
    require('../../css/blocks/icon');
    
    this.on('mount', () => {
      var hammertime = propagating(new Hammer(this.root))
        .on('pan', (ev) => {
          const x = ev.deltaX, y = ev.deltaY;
          store.dispatch({ type: 'EDITOR_RESIZE', data: { x, y, type } });
          ev.stopPropagation();
        })
        .on('panend', (ev) => {
          const x = ev.deltaX, y = ev.deltaY;
          store.dispatch({ type: 'EDITOR_RESIZE_END', data: { x, y, type } });
          ev.stopPropagation();
        });
    });

  </script>

</resize-handle>
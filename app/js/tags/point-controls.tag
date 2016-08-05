require('./icon-button');

<point-controls class={this.getClass()}>
  <icon-button
    each="{ name, value in buttons }"
    name={name}
    is-check={value}
    shape={ 'point-' + name }
    on-tap={ parent.onButtonTap.bind(this) }
  />

  <script type="babel">
    require('../../css/blocks/point-controls');
    const CLASSES = require('../../css/blocks/point-controls.postcss.css.json');

    import store from '../store';

    this.getButtons = () => {
      const state = store.getState().pointControls.present;
      this.buttons = {
        'straight': false,
        'mirrored': false,
        'disconnected': false,
        'asymmetric':   false,
      }
      this.buttons[state.type || 'straight'] = true;
    }

    this.getClass = () => {
      const state = store.getState().pointControls.present;
      const isShow = (state.isShow) ? CLASSES['is-show'] : '';
      return `${opts.classname} ${CLASSES['point-controls']} ${isShow}`;
    }

    this.onButtonTap = (ev, opts) => {
      store.dispatch({ type: 'POINT_CHANGE_TYPE', data: opts.name, isRecord: true });
      ev.stopPropagation();
    }

    store.subscribe(()=> {
      this.getButtons();
      this.update();
    });

  </script>
</point-controls>
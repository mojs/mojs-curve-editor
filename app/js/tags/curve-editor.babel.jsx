import { h, Component } from 'preact';
import store from '../store';
import C from '../constants';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import { ActionCreators } from 'redux-undo';
import mod from '../helpers/resize-mod';
require('../../css/blocks/curve-editor');

class CurveEditor extends Component {
  componentDidMount () {
    var hammertime = propagating(new Hammer(this.base))
      .on('pan', (ev) => {
        this.x = ev.deltaX; this.y = ev.deltaY;
        store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: ev.deltaX, y: ev.deltaY } })
        // this.render();
      })
      .on('panend', (ev) => {
        const x = ev.deltaX,
              y = ev.deltaY,
              {translate} = store.getState().resize;

        this.x = this.y = 0;
        store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: translate.x + x, y: translate.y + y } })
      })
      .on('tap', (ev) => {
        store.dispatch({ type: 'POINT_DESELECT_ALL' });
      });
    this._addKeyUp();
    store.subscribe( () => { this.render(); });
  }

  _addKeyUp () { document.addEventListener('keyup', this._onKeyUp); }

  _onKeyUp (e) {
    if ( !e.altKey ) { return; }
    switch (e.which) {
      case 90: { return store.dispatch(ActionCreators.undo()); }
      case 88: { return store.dispatch(ActionCreators.redo()); }
      case 68: { return store.dispatch({ type: 'POINT_DELETE' }); }
    }
  }

  _getStyle () {
    const {state}  = this.props,
          {resize} = state;
    let {temp_top, temp_bottom, temp_right, translate} = resize;

    temp_top    += resize.top;
    temp_bottom += resize.bottom;
    temp_right  += resize.right;

    const X_SIZE = C.CURVE_SIZE + 53,
          Y_SIZE = C.CURVE_SIZE + 2*C.CURVE_PADDING;

    // constrain min height
    if (Y_SIZE - temp_top < Y_SIZE) { temp_top = 0; }
    if (Y_SIZE + temp_bottom < Y_SIZE) { temp_bottom = 0; }
    if (X_SIZE + temp_right < X_SIZE) { temp_right = 0; }

    temp_top    = mod( temp_top, -1 );
    temp_bottom = mod( temp_bottom );

    const height = `height: ${Y_SIZE - temp_top + temp_bottom}px`,
          width  = `width: ${X_SIZE + temp_right}px`,
          x = (this.x || 0) + translate.x,
          y = (this.y || 0) + translate.y,
          transform = `transform: translate(${x}px, ${y + temp_top}px)`;

    return `${mojs.h.prefix.css}${transform}; ${transform}; ${width}; ${height};`;
  }

  render () {
    const CLASSES  = require('../../css/blocks/curve-editor.postcss.css.json'),
          {state}  = this.props,
          {resize} = state;

    const style = this._getStyle();
    return  (<div className={CLASSES['curve-editor']} style={ style } >
              <div className={CLASSES['curve-editor__left']}></div>
              <div className={CLASSES['curve-editor__right']}></div>
            </div>);
  }
}


export default CurveEditor;

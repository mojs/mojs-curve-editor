import { h, Component } from 'preact';
import C from '../constants';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import { ActionCreators } from 'redux-undo';
import mod from '../helpers/resize-mod';
import CurveEditorRight from './curve-editor-right';
import CurveEditorLeft  from './curve-editor-left';
import Icons from './icons';
import CodePanel from './code-panel';
require('../../css/blocks/curve-editor');

class CurveEditor extends Component {

  render () {
    const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

    const {store} = this.context,
          state   = store.getState(),
          style   = this._getStyle(state);

    return  (<div className={CLASSES['curve-editor']} style={ style }>
                <Icons />
                <CodePanel state={ state }/>
                <CurveEditorLeft state={ state } />
                <CurveEditorRight state={ state } />
              </div>);
  }

  _getStyle (state) {
    const X_SIZE    = C.CURVE_SIZE + 53,
          Y_SIZE    = C.CURVE_SIZE + 2*C.CURVE_PADDING,
          {resize}  = state;
    let {temp_top, temp_bottom, temp_right, translate} = resize;

    temp_top    += resize.top;
    temp_bottom += resize.bottom;
    temp_right  += resize.right;

    // constrain min height
    if (Y_SIZE - temp_top < Y_SIZE) { temp_top = 0; }
    if (Y_SIZE + temp_bottom < Y_SIZE) { temp_bottom = 0; }
    if (X_SIZE + temp_right < X_SIZE) { temp_right = 0; }

    temp_top    = mod( temp_top, -1 );
    temp_bottom = mod( temp_bottom );

    const height = `height: ${Y_SIZE - temp_top + temp_bottom}px`,
          width  = `width: ${X_SIZE + temp_right}px`,
          x = resize.x + resize.tempX,
          y = resize.y + resize.tempY,
          transform = `transform: translate(${x}px, ${y + temp_top}px)`;

    return `${mojs.h.prefix.css}${transform}; ${transform}; ${width}; ${height};`;
  }

  componentDidMount () {
    const {store} = this.context,
          el = this.base.querySelector('#js-left-panel'),
          mc = propagating(new Hammer.Manager(el));

    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc
      .on('pan', (e) => {
        const x = e.deltaX, y = e.deltaY;
        store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x, y } });
      })
      .on('panend', (e) => {
        const x = e.deltaX, y = e.deltaY;
        store.dispatch({ type: 'EDITOR_TRANSLATE_END', data: { x, y } })
      })
      // .on('tap', (e) => { store.dispatch({ type: 'POINT_DESELECT_ALL' }); });

    this._addKeyUp();
    store.subscribe(this.forceUpdate.bind(this));
  }

  _addKeyUp () { document.addEventListener('keyup', this._onKeyUp.bind(this)); }

  _onKeyUp (e) {
    const {store} = this.context;
    if ( !e.altKey ) { return; }
    switch (e.which) {
      case 90: { return store.dispatch(ActionCreators.undo()); }
      case 88: { return store.dispatch(ActionCreators.redo()); }
      case 68: { return store.dispatch({ type: 'POINT_DELETE' }); }
    }
  }

}


export default CurveEditor;

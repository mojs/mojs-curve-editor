import { h, Component } from 'preact';
import C from '../constants';
import Hammer from 'hammerjs';
import propagating from '../vendor/propagating';
import { ActionCreators } from 'redux-undo';
import CurveEditorRight from './curve-editor-right';
import CurveEditorLeft  from './curve-editor-left';
import CodePanel from './code-panel';
import Icons from './icons';
import mod from '../helpers/resize-mod';
import addPointerDown from '../helpers/add-pointer-down';
import {reset} from '../actions/points';
import ActivePool from '../helpers/active-pool';

require('../../css/blocks/curve-editor');

class CurveEditor extends Component {
  render () {
    const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

    const {store} = this.context;
    const state   = store.getState();
    this._state   = state;

    const p         = this.props;
    const {options} = p;
    const {isMinimize, isActive, isHighlight} = state.controls;
    const style     = this._getStyle(state);

    let className = `${CLASSES['curve-editor']}`;
    className += (isMinimize) ? ` ${CLASSES['is-minimized']}` : '';
    className += (!isActive) ? ` ${CLASSES['is-inactive']}` : '';
    className += (isHighlight) ? ` ${CLASSES['is-highlighted']}` : '';
    className += (options.isHiddenOnMin)
      ? ` ${CLASSES['is-hidden-on-min']}` : '';

    this._state = state;
    return  ( <div className={className} style={ style }>
                <Icons />
                <CodePanel state={ state }/>
                <CurveEditorLeft state={ state } />
                <CurveEditorRight state={ state }
                  progressLines={p.progressLines}
                  options={options} />
              </div>);
  }

  _getStyle (state) {
    const {isMinimize, isActive} = this._state.controls;

    const X_SIZE    = C.CURVE_SIZE + 53,
          Y_SIZE    = C.CURVE_SIZE + 2*C.CURVE_PADDING,
          {resize}  = state;
    let {temp_top, temp_bottom, temp_right, translate} = resize;

    temp_top    += resize.top;
    temp_bottom += resize.bottom;
    temp_right  += resize.right;

    const height = `height: ${Y_SIZE - temp_top + temp_bottom}px`,
          width  = `width: ${X_SIZE + temp_right}px`,
          x = resize.x + resize.tempX,
          y = resize.y + resize.tempY,
          transform = `transform: translate(${x}px, ${y + temp_top}px)`;

    return `${mojs.h.prefix.css}${transform}; ${transform}; ${width}; ${height};`;
  }

  componentDidMount () {
    this._resetCounter = 0;

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

    this._addKeyUp();
    this._subscribeFocus();
    store.subscribe(this.forceUpdate.bind(this));
  }

  _addKeyUp () { document.addEventListener('keyup', this._onKeyUp.bind(this)); }

  _onKeyUp (e) {
    const {store} = this.context;
    const {controls} = this._state;
    // don't react on shortcuts if inactive or minimized
    if (!controls.isActive || controls.isMinimize) { return; }
    // don't react if `alt` key is not set
    if ( !e.altKey ) { return; }
    switch (e.which) {
      // z
      case 90: { return store.dispatch(ActionCreators.undo()); }
      // x
      case 88: { return store.dispatch(ActionCreators.redo()); }
      // d
      case 68: { return store.dispatch({ type: 'POINT_DELETE' }); }
      // \
      case 220: { return e.shiftKey && this._tryToReset(store); }
    }
  }

  _tryToReset (store) {
    if (++this._resetCounter > 2) { reset(store); }

    clearTimeout(this._tm);
    this._tm = setTimeout(() => { this._resetCounter = 0; }, 300);
  }

  _subscribeFocus () {
    this._createActivePool();
    const {store} = this.context;
    addPointerDown( this.base, (e) => {
      const pool = mojs[C['ACTIVE_POOL_NAME']];
      pool && pool.resetActive(this);
      if (!this._state.controls.isActive) {
        store.dispatch({ type: 'SET_ACTIVE', data: true });
      }
    });
  }

  _getPool () {
    let activePool = null;
    if (!mojs[C['ACTIVE_POOL_NAME']]) {
      mojs[C['ACTIVE_POOL_NAME']] = new ActivePool;
    }
    return mojs[C['ACTIVE_POOL_NAME']];
  }

  _createActivePool () {
    const activePool = this._getPool();
    activePool.add(this._setInactive.bind(this));
    mojs[C['ACTIVE_POOL_NAME']] = activePool;
  }

  _setInactive (module) {
    const {store} = this.context;
    if (module !== this) {
      store.dispatch({ type: 'SET_ACTIVE', data: false });
    }
  }

}


export default CurveEditor;

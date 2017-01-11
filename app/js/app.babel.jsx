import { Provider } from 'preact-redux';
import {render, h}  from 'preact';
import CurveEditor  from './tags/curve-editor';
import initStore    from './store';
import C            from './constants';
import hash         from './helpers/hash';
import fallbackTo   from './helpers/fallback-to';
import defer        from './helpers/defer';
import {reset}      from './actions/points';
import addPointerDown from './helpers/add-pointer-down';

/*
  API wrapper above the app itself.
*/
class API {
  constructor ( o = {} ) {
    this._o = o;

    this._decalareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
    this._tryToRestore();
    this._listenUnload();

    this._subscribe();
    // this._subscribeFocus();
  }

  _decalareDefaults ( ) {
    this._defaults = {
      name:             'mojs-curve-editor',
      isSaveState:      true,
      isHiddenOnMin:    false,
      onChange:         null
    }
  }

  _extendDefaults () {
    this._props = {};

    for (let key in this._defaults) {
      this._props[ key ] = fallbackTo( this._o[key], this._defaults[key] );
    }
  }

  _vars () {
    this.revision = '1.5.0';
    this.store    = initStore();

    this._easings = [];
    this._progressLines = [];

    // let str = fallbackTo( this._o.name, this._defaults.name );
    let str = this._props.name;
    str += ( str === this._defaults.name ) ? '' : `__${this._defaults.name}`;
    this._localStorage = `${str}__${ hash( str ) }`;

    this.store.dispatch({ type: 'SET_EDITOR_NAME', data: this._localStorage });
  }

  _render () {
    const doc = document;
    const docState = doc.readyState;
    if (docState === "complete" ||
        docState === "loaded"  ||
        docState === "interactive") {
        return this._renderApp();
    }

    doc.addEventListener('DOMContentLoaded', () => {this._renderApp()});
  }

  _renderApp () {
    render(
      <Provider store={this.store}>
        <CurveEditor progressLines={this._progressLines}
                     options={this._props}
                     ref={(el) => { this._el = el; }} />
      </Provider>,
      document.body
    );
  }

  _listenUnload () {
    const unloadEvent = ('onpagehide' in window) ? 'pagehide' : 'beforeunload';
    window.addEventListener( unloadEvent, () => {
      if ( this._props.isSaveState ) {
        const preState = { ...this.store.getState() };

        delete preState.points.history;
        delete preState.pointControls.history;
        preState.progressLines.lines = [];

        localStorage.setItem(this._localStorage, JSON.stringify( preState ) );
      } else {
        localStorage.removeItem( this._localStorage );
      }
    });
  }

  _tryToRestore () {
    const stored = localStorage.getItem(this._localStorage);
    if ( stored ) { this.store.dispatch({ type: 'SET_STATE', data: JSON.parse(stored) });}
    else { reset(this.store); }
  }

  _subscribe () {
    this._compilePath();
    this.store.subscribe( this._compilePath.bind(this) );
  }

  _compilePath () {
    const state     = this.store.getState();
    const points    = state.points.present;
    const {path}    = points;

    if (!this._easing) { this._easing = mojs.easing.path(path); }

    clearTimeout( this._tm );
    this._tm = setTimeout( () => {
      if ( this._prevPath !== path ) {
        this._prevPath = path;
        this._easing = mojs.easing.path( path );
        this._fireOnChange( path );
      }
    }, 40 );
  }

  _fireOnChange ( path ) {
    const {onChange} = this._props;
    if (typeof onChange === 'function') { onChange(path); }

    // update timeline and tweens - parents of the easing functions
    for (var i = 0; i < this._easings.length; i++) {
      const record     = this._easings[i],
            {options, easing}  = record,
            {onChange} = options;

      (typeof onChange === 'function' ) && onChange( easing, path );
      this._updateParent( easing );
    }
  }

  _updateParent( easing ) {
    const parent = easing._parent;
    if (!parent) { return; };

    if (parent.setProgress ) {
      this._triggerParent(parent);
    } else if (parent._o.callbacksContext) {
      this._triggerParent(parent._o.callbacksContext.timeline);
    } else if (parent.timeline) {
      this._triggerParent(parent.timeline);
    } else if (parent.tween) {
      this._triggerParent(parent.tween);
    }
  }

  _triggerParent (parent) {
    const step = 0.01;
    const {progress} = parent;
    const updateProgress = (progress + step < 1 )
            ? (progress + step) : (progress - step);

    parent.setProgress( updateProgress );
    parent.setProgress( progress );
  }

  _updateProgressLine (p, i, lines) {
    const el = lines[i],
          state = this.store.getState(),
          {resize} = state;

    if ( !el ) { return; }

    el.style.left = `${p*100}%`;
  }

  getEasing (o={}) {
    // get the easing function regarding reverse options
    const fun = (() => {
      const i = this._easings.length;
      return (k) => {
        this._updateProgressLine( k, i, this._progressLines );
        const transform = this._easings[i].options.transform;
        return ( transform )
          ? transform( this._easing( k ) ) : this._easing( k );
      }
    })();

    this.store.dispatch({ type: 'ADD_PROGRESS_LINE', data: {} });
    this._easings.push({ options: o, easing: fun });

    defer(() => { this._fireOnChange( this._prevPath ); });
    return fun;
  }

  minimize() { this.store.dispatch({ type: 'SET_MINIMIZE', data: true }); }

  maximize() { this.store.dispatch({ type: 'SET_MINIMIZE', data: false }); }

  toggleSize() {
    const state = this.store.getState();
    const {controls} = state;

    controls.isMinimize ? this.maximize() : this.minimize();
  }

  // highlight() { this.store.dispatch({ type: 'SET_HIGHLIGHT', data: true }); }
  // dim() { this.store.dispatch({ type: 'SET_HIGHLIGHT', data: false }); }
  // toggleHighlight() {
  //   const state = this.store.getState();
  //   const {controls} = state;
  //
  //   controls.isHighlight ? this.dim() : this.highlight();
  // }

}

export default API;
window.MojsCurveEditor = API;

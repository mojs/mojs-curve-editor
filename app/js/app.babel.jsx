import { Provider } from 'preact-redux';
import {render, h}  from 'preact';
import CurveEditor  from './tags/curve-editor';
import initStore    from './store';
import C            from './constants';
import hash         from './helpers/hash';
import fallbackTo   from './helpers/fallback-to';
import defer        from './helpers/defer';
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
    this._subscribeFocus();
  }

  _decalareDefaults ( ) {
    this._defaults = {
      name:           'mojs-curve-editor',
      isSaveState:    true
    }
  }

  _extendDefaults () {
    this._props = {};

    for (let key in this._defaults) {
      this._props[ key ] = fallbackTo( this._o[key], this._defaults[key] );
    }
  }

  _vars () {
    this.revision = '1.2.1';
    this.store    = initStore();

    this._easings = [];
    this._progressLines = [];

    let str = fallbackTo( this._o.name, this._defaults.name );
    str += ( str === this._defaults.name ) ? '' : `__${this._defaults.name}`;
    this._localStorage = `${str}__${ hash( str ) }`;

    this.store.dispatch({ type: 'SET_EDITOR_NAME', data: this._localStorage });
  }

  _render () {
    document.addEventListener('DOMContentLoaded', () => {
      render(
        <Provider store={this.store}>
          <CurveEditor progressLines={this._progressLines} />
        </Provider>, document.body);
    });
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
    else {
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 0,   y: C.CURVE_SIZE, isLockedX: true}, index: 0 } });
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 100, y: 0, isLockedX: true}, index: 1 } });
      // this.store.dispatch({ type: 'POINT_SELECT', data: { index: 0, type: 'straight' } });
    }
  }

  _subscribe () {
    this._compilePath();
    this.store.subscribe( this._compilePath.bind(this) );
  }

  _subscribeFocus () {
    addPointerDown( document.body, (e) => {
      if (this._localStorage !== e._mojsCurveEditorName) {
        this.store.dispatch({ type: 'POINT_DESELECT_ALL' });
      }
    });
  }

  _compilePath () {

    const state     = this.store.getState(),
          points    = state.points.present,
          {path}    = points;

    if ( !this._easing ) { this._easing = mojs.easing.path( path ); }

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

    // console.log(parent.timeline.callbacksContext);

    if ( parent && parent.setProgress ) {
      this._triggerParent( parent );
    } else if ( parent.timeline ) {
      this._triggerParent( parent.timeline )
    } else if ( parent.tween ) {
      this._triggerParent( parent.tween )
    }
  }

  _triggerParent (parent) {
    const step = 0.01,
          {progress} = parent,
          updateProgress = (progress + step < 1 )
            ? (progress + step) : (progress - step);

    // console.log(updateProgress, progress);
    parent.setProgress( updateProgress );
    parent.setProgress( progress );
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

    defer( () => { this._fireOnChange( this._prevPath ); });
    return fun;
  }

  _updateProgressLine (p, i, lines) {
    const el = lines[i],
          state = this.store.getState(),
          {resize} = state;

    if ( !el ) { return; }

    el.style.left = `${p*100}%`;
  }

}

export default API;
window.MojsCurveEditor = API;

// import './tags/curve-editor.tag';
require('../css/main');
import { Provider } from 'preact-redux';
import {render, h}  from 'preact';
import CurveEditor  from './tags/curve-editor';
import initStore    from './store';
import C            from './constants';
import hash         from './helpers/hash';
import fallbackTo   from './helpers/fallback-to';

// TODO
//   - add APIs
//   - resize down when points are above the editor border
//   - instance dropdown on code panel
//   - import path data
//   - move bunch of points at once

class API {
  constructor ( o = {} ) {
    this._o = o;

    this._decalareDefaults();
    this._vars();
    this._render();
    this._tryToRestore();
    this._listenUnload();

    this._subscribe()
  }

  _decalareDefaults ( ) {
    this._defaults = {
      name:        'mojs-curve-editor',
      isSaveState: true,
    }
  }

  _vars () {
    this.revision = '1.0.0';
    this.store    = initStore();

    let str = fallbackTo( this._o.name, this._defaults.name );
    str += ( str === this._defaults.name ) ? '' : `__${this._defaults.name}`;
    this._localStorage = `${str}__${ hash( str ) }`;
  }

  _render () {
    document.addEventListener('DOMContentLoaded', () => {
      render(
        <Provider store={this.store}>
          <CurveEditor />
        </Provider>, document.body);
    });
  }

  _listenUnload () {
    const unloadEvent = ('onpagehide' in window) ? 'pagehide' : 'beforeunload';
    window.addEventListener( unloadEvent, () => {
      
      const preState = { ...this.store.getState() };

      delete preState.points.history;
      delete preState.pointControls.history;

      localStorage.setItem(this._localStorage, JSON.stringify( preState ) );
    });
  }

  _tryToRestore () {
    // localStorage.removeItem(this._localStorage);
    const stored = localStorage.getItem(this._localStorage);
    if ( stored ) { this.store.dispatch({ type: 'SET_STATE', data: JSON.parse(stored) });}
    else {
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 0,   y: C.CURVE_SIZE, isLockedX: true}, index: 0 } });
      this.store.dispatch({ type: 'POINT_ADD', data: { point: {x: 100, y: 0, isLockedX: true}, index: 1 } });
      this.store.dispatch({ type: 'POINT_SELECT', data: { index: 0, type: 'straight' } });
    }
  }

  _subscribe () {
    this._compilePath();
    this.store.subscribe( this._compilePath.bind(this) );
  }

  _compilePath () {
    const state     = this.store.getState(),
          points    = state.points.present,
          {path}    = points;

    if ( this._prevPath !== path ) {
      this._prevPath = path;
      this._easing = mojs.easing.path( path );
    }
  }

}

export default API;
window.MojsCurveEditor = API;

// curve
//   .getFunction({ isInverseX: false, isInverseY: true, name: 'Some name' })
//   .getCode()




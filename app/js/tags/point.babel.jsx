import { h, Component } from 'preact';
import LittleHandle from './little-handle';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import mod from '../helpers/resize-mod';
import roundTo from '../helpers/round-to';
import C from '../constants';

const CLASSES = require('../../css/blocks/point.postcss.css.json')

class Point extends Component {
  render () {
    const {point}   = this.props,
          selected  = (point.isSelected) ? CLASSES['is-selected'] : '',
          handles   = (point.type === 'straight') ? CLASSES['is-hide-handles'] : '';

    return  <div className={`${CLASSES['point']} ${selected} ${handles}`}>
              <div className={CLASSES['point__touch'] } id="js-point-touch"></div>
            </div>
  }
  
  componentDidMount () {
    const {store}  = this.context,
          {resize} = this.props.state;
          {point}  = this.props;

    const getTempX = (e) => {
      // if point is not locked to x axes ->
      // calculate delta regarding scaler
      if ( point.isLockedX ) { return 0 };
        
      const x = e.deltaX/resize.scalerX;
      if ( point.x + x < 0 ) { return 0 - point.x; }
      else if ( point.x + x > 100 ) { return 100 - point.x; }
      return roundTo( x, 5, 1.5 );
    }

    const getY = (e) => {
      const y = point.y + e.deltaY
      // clamp y to the size of curve
      return clamp( y, resize.top, C.CURVE_SIZE + resize.bottom ); 
    }

    // get y delta reagarding curve bounds
    const getTempY = (e) => {
      let y = point.y + e.deltaY;

      let returnValue = y;
      if ( y < resize.top ) {
        returnValue = (resize.top - point.y);
      } else if ( y > C.CURVE_SIZE + resize.bottom ) {
        returnValue = C.CURVE_SIZE + resize.bottom - point.y;
      } else {
        returnValue = e.deltaY;
      }

      return roundTo( returnValue, 5*C.CURVE_PERCENT, 2*C.CURVE_PERCENT );
    }

    const el = this.base.querySelector('#js-point-touch'),
          mc = new Hammer.Manager(el);
    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc
      .on('pan', (e) => {
        store.dispatch({
          type: 'POINT_TRANSLATE',
          data: { x: getTempX(e), y: getTempY(e), index: this._index }
        });
        e.stopPropagation();
      })
      .on('panend', (e) => {
        // fire translate end and save it to the store
        store.dispatch({
          type: 'POINT_TRANSLATE_END',
          data: this._index,
          isRecord: true
        });

        e.stopPropagation();
      })
      .on('tap', (e) => {
        store.dispatch({
          type: 'POINT_SELECT',
          data: {
            index:      this._index,
            type:       point.type,
            isDeselect: !e.srcEvent.shiftKey
          }
        });
        e.stopPropagation();
      });
  }
}

export default Point;
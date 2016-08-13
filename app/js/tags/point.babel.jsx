import { h, Component } from 'preact';
import LittleHandle from './little-handle';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';
import roundTo from '../helpers/round-to';
import clamp from '../helpers/clamp';
import mod from '../helpers/resize-mod';
import C from '../constants';

require('../../css/blocks/point');
const CLASSES = require('../../css/blocks/point.postcss.css.json');

class Point extends Component {
  render () {
    const {point, state} = this.props,
          selected  = (point.isSelected) ? CLASSES['is-selected'] : '',
          handles   = (point.type === 'straight') ? CLASSES['is-hide-handles'] : '';

    const littleHandles = this._getLittleHandles( state );

    return  <div  className={`${CLASSES['point']} ${selected} ${handles}`}
                  style={ this._getStyle(state) }
                  data-component="point">

              <div className={CLASSES['point__touch'] } id="js-point-touch" />

              { littleHandles }

            </div>
  }

  _getStyle (state) {
    const {point}   = this.props,
          {resize}  = state,
          x         = clamp(point.x + point.tempX, 0, 100),
          cleanX    = x * resize.scalerX,
          y = point.y + point.tempY;

    const translate = `transform: translate(${cleanX}px, ${y-1}px)`;
    return `${mojs.h.prefix.css}${translate}; ${translate}`;
  }

  _getLittleHandles (state) {
    const {index, point, pointsCount} = this.props,
          handles = [];
    // dont set the handle1 for start point
    (index !== 0) && handles.push( this._createHandle( 1, point ) );
    // dont set the handle2 for end point
    (index !== pointsCount-1) && handles.push( this._createHandle( 2, point ) );
    return handles;
  }

  _createHandle (index, point)  {
    return <LittleHandle
        index={index}
        state={this.props.state}
        parentIndex={this.props.index}
        handle={point[`handle${index}`]}
        type={point.type}
        />
  }
  
  componentDidMount () {
    const {store}  = this.context,
          {resize} = this.props.state,
          {point, index} = this.props;

    const getTempX = (e) => {
      const {resize} = this.props.state,
            {point, index} = this.props;
      // if point is not locked to x axes ->
      // calculate delta regarding scaler
      if ( point.isLockedX ) { return 0 };
        
      const x = e.deltaX/resize.scalerX;
      if ( point.x + x < 0 ) { return 0 - point.x; }
      else if ( point.x + x > 100 ) { return 100 - point.x; }
      return roundTo( point.x + x, 5, 1.5 ) - point.x;
    }

    const getY = (e) => {
      const {resize} = this.props.state,
            {point, index} = this.props,
            y = point.y + e.deltaY;

      // clamp y to the size of curve
      return clamp( y, resize.top, C.CURVE_SIZE + resize.bottom ); 
    }

    // get y delta reagarding curve bounds
    const getTempY = (e) => {
      const {resize} = this.props.state,
            {point, index} = this.props;

      let y = point.y + e.deltaY,
          returnValue = y;

      if ( y < resize.top ) {
        returnValue = resize.top;
      } else if ( y > C.CURVE_SIZE + resize.bottom ) {
        returnValue = C.CURVE_SIZE + resize.bottom;
      }

      return roundTo( returnValue, 5*C.CURVE_PERCENT, 2*C.CURVE_PERCENT ) - point.y;
    }

    const el = this.base.querySelector('#js-point-touch'),
          mc = propagating(new Hammer.Manager(el));

    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc.add(new Hammer.Tap);

    mc
      .on('pan', (e) => {
        store.dispatch({
          type: 'POINT_TRANSLATE',
          data: { x: getTempX(e), y: getTempY(e), index }
        });
        e.stopPropagation();
      })
      .on('panend', (e) => {
        // fire translate end and save it to the store
        store.dispatch({
          type: 'POINT_TRANSLATE_END', data: index, isRecord: true
        });
        e.stopPropagation();
      })
      .on('tap', (e) => {
        store.dispatch({
          type: 'POINT_SELECT',
          data: {
            index, type: point.type, isDeselect: !e.srcEvent.shiftKey
          }
        });
        e.stopPropagation();
      });
  }
}

export default Point;
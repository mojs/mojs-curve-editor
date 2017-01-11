import {h, Component} from 'preact';
import angleToPoint from '../helpers/angle-to-point';
import pointToAngle from '../helpers/point-to-angle';
import C from '../constants';
import pool from '../pool';

import propagating from '../vendor/propagating';
import Hammer from 'hammerjs';

require('../../css/blocks/little-handle');
const CLASSES = require('../../css/blocks/little-handle.postcss.css.json');

class LittleHandle extends Component {
  render () {
    return (
      <div className={CLASSES['little-handle']}
            data-component="little-handle">
        <div class={CLASSES['little-handle__point']}
          style={this._getPointStyle()}>
          <div className={CLASSES['little-handle__easy-touch']} />
        </div>

        <div class={ CLASSES['little-handle__line'] }
             style={this._getLineStyle()} />
      </div>
    );
  }

  componentDidMount () {
    const {store}  = this.context,
          mc       = propagating(new Hammer.Manager(this.base));

    var {handle} = this.props;
    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc
      .on('panstart', (e) => { handle = this.props.handle; })
      .on('pan', (e) => {
        const {index, parentIndex, state} = this.props,
              point     = angleToPoint( handle.angle, handle.radius ),
              newY      = point.y + e.deltaY,
              {resize}  = state,
              absX      = point.x + (e.deltaX)/resize.absScalerX,
              angle     = pointToAngle( absX, newY );

        store.dispatch({
          type: 'HANDLE_TRANSLATE',
          data: { index, parentIndex, ...angle }
        });

        if ( this.props.type === 'mirrored' ) {
          const i = (index === 1) ? 2 : 1;
          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index:      i, parentIndex,
              radius:     angle.radius,
              angle:      angle.angle - 180
            }
          });
        }

        if ( this.props.type === 'asymmetric' ) {
          const i = (index === 1) ? 2 : 1;
          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index:      i, parentIndex,
              radius:     handle.radius,
              angle:      angle.angle - 180
            }
          });
        }
        e.stopPropagation();
      })
      .on('panend', (e) => {
        store.dispatch({ type: 'HANDLE_TRANSLATE_END', isRecord: true });
        pool.clear();
        e.stopPropagation();
      });
  }

  _getPointStyle () {
    const {handle, state}  = this.props,
          {resize}  = state,
          point     = angleToPoint( handle.angle, handle.radius ),
          translate = `transform: translate(${point.x*resize.absScalerX}px, ${point.y}px) rotate(${handle.angle}deg)`;

    return `${mojs.h.prefix.css}${translate}; ${translate}`;
  }

  _getLineStyle () {
    const {handle, state}  = this.props,
          {resize}  = state,
          // since the angle and radius were stored as absolute,
          // e.g. regardless the editor's horizontal resize,
          // we need to recalc the x position for the line
          point     = angleToPoint( handle.angle, handle.radius ),
          newVector = pointToAngle( point.x*resize.absScalerX, point.y ),
          translate = `transform: rotate(${newVector.angle}deg) scaleY(${newVector.radius})`;

    return `${mojs.h.prefix.css}${translate}; ${translate}`;
  }


}

export default LittleHandle;

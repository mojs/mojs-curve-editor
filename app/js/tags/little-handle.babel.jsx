import {h, Component} from 'preact';
import angleToPoint from '../helpers/angle-to-point';
import pointToAngle from '../helpers/point-to-angle';

import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';

require('../../css/blocks/little-handle');
const CLASSES = require('../../css/blocks/little-handle.postcss.css.json');

class LittleHandle extends Component {
  render () {
    // const {state} = this.props;
    return  <div  className={CLASSES['little-handle']}
                  data-component="little-handle">
              <div
                class={ CLASSES['little-handle__point'] }
                style={this._getPointStyle()} />

              <div
                class={ CLASSES['little-handle__line'] }
                style={this._getLineStyle()} />
            </div>;
  }

  componentDidMount () {
    const {store}  = this.context,
          mc       = propagating(new Hammer.Manager(this.base));

    var {handle} = this.props;
    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc
      .on('panstart', (e) => { handle = this.props.handle; })
      .on('pan', (e) => {
        const {index, parentIndex} = this.props;

        const point = angleToPoint( handle.angle, handle.radius ),
              newX  = point.x + e.deltaX,
              newY  = point.y + e.deltaY,
              angle = pointToAngle( newX, newY );

        store.dispatch({
          type: 'HANDLE_TRANSLATE',
          data: { index, parentIndex, ...angle }
        });

        if ( this.props.type === 'mirrored' ) {
          const i = (index === 1) ? 2 : 1;
          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index: i, parentIndex,
              radius: angle.radius,
              angle:  angle.angle - 180
            }
          });
        }

        if ( this.props.type === 'asymmetric' ) {
          const i = (index === 1) ? 2 : 1;
          store.dispatch({
            type: 'HANDLE_TRANSLATE',
            data: {
              index: i, parentIndex,
              radius: handle.radius,
              angle:  angle.angle - 180
            }
          });
        }
        e.stopPropagation();
      })
      .on('panend', (e) => { e.stopPropagation(); });
  }

  _getPointStyle () {
    const {handle}  = this.props,
          point     = angleToPoint( handle.angle, handle.radius ),
          translate = `transform: translate(${point.x}px, ${point.y}px) rotate(${handle.angle}deg)`;

    return `${mojs.h.prefix.css}${translate}; ${translate}`;
  }

  _getLineStyle () {
    const {handle}  = this.props,
          translate = `transform: rotate(${handle.angle}deg) scaleY(${handle.radius})`;

    return `${mojs.h.prefix.css}${translate}; ${translate}`;
  }


}

export default LittleHandle;

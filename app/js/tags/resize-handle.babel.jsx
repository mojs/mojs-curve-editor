import { h, Component } from 'preact';
import Icon from './icon';
import Hammer from 'hammerjs';
import propagating from 'propagating-hammerjs';

const CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');

require('../../css/blocks/resize-handle');
class ResizeHandle extends Component {
  render () {
    const {type} = this.props,
          className = `${CLASSES['resize-handle']}`,
          classType = `${CLASSES['resize-handle--' + type ]}`;
    return <div
      className={ `${className} ${classType} ${this.props.className}` }
      data-type={type}
      data-component="resize-handle">
        <Icon shape="ellipsis" />
      </div>;
  }

  componentDidMount () {
    const {store} = this.context,
          {type}  = this.props,
          mc      = propagating(new Hammer.Manager(this.base));

    mc.add(new Hammer.Pan({ threshold: 0 }));
    mc
      .on('pan', (e) => {
        const x = e.deltaX, y = e.deltaY;
        store.dispatch({ type: 'EDITOR_RESIZE', data: { x, y, type } });
        e.stopPropagation();
      })
      .on('panend', (e) => {
        const x = e.deltaX, y = e.deltaY;
        store.dispatch({ type: 'EDITOR_RESIZE_END', data: { x, y, type } });
        e.stopPropagation();
      });
  }
}

export default ResizeHandle;
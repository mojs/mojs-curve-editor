import { h, Component } from 'preact';
import Icon from './icon';
import Hammer from 'hammerjs';
import propagating from '../vendor/propagating';
import modDeltas from '../helpers/mod-deltas';

const CLASSES = require('../../css/blocks/resize-handle.postcss.css.json');

require('../../css/blocks/resize-handle');
class ResizeHandle extends Component {
  render () {
    const {type} = this.props,
          className = `${CLASSES['resize-handle']}`,
          classType = `${CLASSES['resize-handle--' + type ]}`;
    return (<div className={`${className} ${classType} ${this.props.className}`}
                  data-type={type} data-component="resize-handle">
        <Icon shape="ellipsis" />
      </div>);
  }

  componentDidMount () {
    const {type}  = this.props;
    const {store} = this.context;
    this._mc      = propagating(new Hammer.Manager(this.base));

    this._mc.add(new Hammer.Pan({ threshold: 0 }));
    this._mc
      .on('pan', (e) => {
        store.dispatch({ type: 'EDITOR_RESIZE', data: {
            ...modDeltas(e.deltaX, e.deltaY, type, this.props.state)
          }
        });
        e.stopPropagation();
      })
      .on('panend', (e) => {
        store.dispatch({ type: 'EDITOR_RESIZE_END', data: {
            ...modDeltas(e.deltaX, e.deltaY, type, this.props.state)
          }
        });
        e.stopPropagation();
      });
  }

  componentWillUnmount() {
    this._mc.off('pan');
    this._mc.off('panend');
  }
}

export default ResizeHandle;

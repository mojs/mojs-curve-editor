import {h, Component} from 'preact';
import IconButton from './icon-button';

require('../../css/blocks/point-controls');
const CLASSES = require('../../css/blocks/point-controls.postcss.css.json');

class PointControls extends Component {
  render () {
    const p = this.props,
          {state}   = p,
          controls  = state.pointControls.present,
          show      = (controls.isShow) ? CLASSES['is-show'] : '',
          className = `${p.className} ${CLASSES['point-controls']} ${show}`,
          buttons   = this._addButtons(controls);

    return <div className={className}> {buttons} </div>
  }

  _onButtonTap (type) {
    return (e) => {
      const {store} = this.context;

      store.dispatch({ type: 'POINT_CHANGE_TYPE', data: type, isRecord: true });
    }
  }

  _addButtons (controls) {
    const buttonsMap  = [ 'straight', 'disconnected', 'mirrored', 'asymmetric' ],
          buttons     = [];

    for (var i = 0; i < buttonsMap.length; i++) {
      const type = buttonsMap[i];
      buttons.push(<IconButton  shape={`point-${type}`}
                                title={type}
                                isCheck={ controls.type === type }
                                onTap={ this._onButtonTap(type) } />);
    }
    return buttons;
  }
}

export default PointControls;
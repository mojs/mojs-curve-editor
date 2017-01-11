import {h, Component} from 'preact';
import IconButton from './icon-button';
import propagating from '../vendor/propagating';
import Hammer from 'hammerjs';

class MaximizeButton extends Component {
  render () {
    const {state} = this.props;
    return (
      <div data-component="maximize-button" title="maximize">
        <IconButton shape="maximize" />
      </div>
    );
  }
  componentDidMount () {
    const {store} = this.context;
    const mc = propagating(new Hammer.Manager(this.base));
    mc.add(new Hammer.Tap);

    mc.on('tap', (e) => {
      store.dispatch({ type: 'SET_MINIMIZE', data: false });
    });
  }
}

export default MaximizeButton;

import {h, Component} from 'preact';
import IconButton from './icon-button';
import propagating from '../vendor/propagating';
import Hammer from 'hammerjs';

class MinimizeButton extends Component {
  render () {
    const {state} = this.props;
    return  <div data-component="minimize-button" title="minimize">
              <IconButton shape="minimize" />
            </div>;
  }
  componentDidMount () {
    const {store} = this.context;
    const mc = propagating(new Hammer.Manager(this.base));
    mc.add(new Hammer.Tap);

    mc.on('tap', (e) => {
      store.dispatch({ type: 'SET_MINIMIZE', data: true });
    });
  }
}

export default MinimizeButton;

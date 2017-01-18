import {h, Component} from 'preact';
import IconButton from './icon-button';
import propagating from '../vendor/propagating';
import Hammer from 'hammerjs';

class MinimizeButton extends Component {
  render () {
    const {state} = this.props;
    return (
      <div data-component="minimize-button" title="minimize">
        <IconButton shape="minimize" />
      </div>
    );
  }
  componentDidMount () {
    const {store} = this.context;
    this._mc = propagating(new Hammer.Manager(this.base));
    this._mc.add(new Hammer.Tap);

    this._mc.on('tap', (e) => {
      store.dispatch({ type: 'SET_MINIMIZE', data: true });
    });
  }

  componentWillUnmount() { this._mc.off('tap'); }
}

export default MinimizeButton;

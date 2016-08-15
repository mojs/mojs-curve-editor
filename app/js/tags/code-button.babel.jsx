import {h, Component} from 'preact';
import IconButton from './icon-button';
import propagating from 'propagating-hammerjs';
import Hammer from 'hammerjs';

class CodeButton extends Component {
  render () {
    const {state} = this.props;
    return <IconButton shape="code" isCheck={state.controls.isCode} />;
  }
  componentDidMount () {
    const {store} = this.context;
    const mc = propagating(new Hammer.Manager(this.base));
    mc.add(new Hammer.Tap);

    mc.on('tap', (e) => { store.dispatch({ type: 'CODE_TAP' }); });
  }
}

export default CodeButton;
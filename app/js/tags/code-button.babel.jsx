import {h, Component} from 'preact';
import IconButton from './icon-button';
import propagating from '../vendor/propagating';
import Hammer from 'hammerjs';

class CodeButton extends Component {
  render () {
    const {state} = this.props;
    return (
      <div data-component="code-button" title="get code">
        <IconButton shape="code" isCheck={state.controls.isCode} />
      </div>
    );
  }
  componentDidMount () {
    const {store} = this.context;
    this._mc = propagating(new Hammer.Manager(this.base));
    this._mc.add(new Hammer.Tap);

    this._mc.on('tap', (e) => { store.dispatch({ type: 'CODE_TAP' }); });
  }

  componentWillUnmount() { this._mc.off('tap'); }
}

export default CodeButton;

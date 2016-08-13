import Hammer from 'hammerjs';
// import propagating from 'propagating-hammerjs';
import {h, Component} from 'preact';
import Icon from './icon';

require('../../css/blocks/icon-button');
const CLASSES = require('../../css/blocks/icon-button.postcss.css.json');

class IconButton extends Component {
  render () {
    const check = (this.props.isCheck) ? CLASSES['is-checked'] : '';
    return  <div  className={`${CLASSES['icon-button']} ${check}`}
                  data-component={'icon-button'}>
              <Icon shape={this.props.shape} />
            </div>;
  }

  componentDidMount () {
    if ( typeof this.props.onTap === 'function' ) {
      var hammertime = new Hammer(this.base)
        .on('tap', (e) => { this.props.onTap( e, this.props ) });
    }
  }
}

export default IconButton;
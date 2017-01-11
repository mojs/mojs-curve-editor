import Hammer from 'hammerjs';
import {h, Component} from 'preact';
import Icon from './icon';

require('../../css/blocks/icon-button');
const CLASSES = require('../../css/blocks/icon-button.postcss.css.json');

class IconButton extends Component {
  render () {
    const p = this.props;
    const check = (p.isCheck) ? CLASSES['is-checked'] : '';
    return  <div  className={`${CLASSES['icon-button']} ${check}`}
                  title={ p.title || '' }
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

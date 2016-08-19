import {h, Component} from 'preact';

require('../../css/blocks/progress-line');
const CLASSES = require('../../css/blocks/progress-line.postcss.css.json');

class ProgressLine extends Component {
  render () {
    const p = this.props,
          style = { backgroundColor: p.color }
    return  <div  className={CLASSES['progress-line']}
                  style={style}
                  data-component={'progress-line'} />;
  }
}

export default ProgressLine;
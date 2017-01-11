import {h, Component} from 'preact';

require('../../css/blocks/ruler');
const CLASSES = require('../../css/blocks/ruler.postcss.css.json');
export class Ruler extends Component {
  render () {
    let className = `${CLASSES['ruler']}`;
    if (this.props.type === 'right') { className += ` ${CLASSES['ruler--right']}` }
    return  <div className={className} data-component="ruler">
              <div className={`${CLASSES['ruler__item']} ${CLASSES['ruler__item--2']}`}> 2  </div>
              <div className={`${CLASSES['ruler__item']} ${CLASSES['ruler__item--1']}`}> 1  </div>

              <div className={`${CLASSES['ruler__item']} ${CLASSES['ruler__item--0']}`}> 0  </div>

              <div className={`${CLASSES['ruler__item']} ${CLASSES['ruler__item--n1']}`}> -1  </div>
              <div className={`${CLASSES['ruler__item']} ${CLASSES['ruler__item--n2']}`}> -2  </div>

            </div>;
  }
}

export default Ruler;

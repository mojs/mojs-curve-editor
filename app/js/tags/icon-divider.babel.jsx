import {h} from 'preact';
const CLASSES = require('../../css/blocks/icon-divider.postcss.css.json');
require('../../css/blocks/icon-divider');

export default () => {
  return <div className={CLASSES['icon-divider']}
              data-component="icon-divider" />;
}
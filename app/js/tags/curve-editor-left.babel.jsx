
import {h} from 'preact';
import Icon from './icon';

const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

const CurveEditorLeft = () => {
  return  <div className={CLASSES['curve-editor__left']}>
            <a
              className={CLASSES['curve-editor__mojs-logo']}
              href="https://github.com/legomushroom/mojs-curve-editor" target="_blank">
              <Icon shape="mojs-logo" />
            </a>
          </div>;
}

export default CurveEditorLeft;

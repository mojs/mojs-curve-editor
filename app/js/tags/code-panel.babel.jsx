import {h} from 'preact';
import ResizeHandle from './resize-handle';

// const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

require('../../css/blocks/code-panel');
const CLASSES = require('../../css/blocks/code-panel.postcss.css.json');
export default ({state}) => {
  const {points, controls} = state;
  const isShow = controls.isCode && !controls.isMinimize
  const open = (isShow) ? CLASSES['is-open'] : '';
  const mainClass = `${CLASSES['code-panel']} ${open}`;

  return  <div className={mainClass}>
            <div className={ CLASSES['code-panel__inner'] }>
              <ResizeHandle state={ state } type="top" />
              <div className={ CLASSES['code-panel__input-wrap'] }>
                <input  className={ CLASSES['code-panel__input-field'] }
                        type="text" readonly="readonly"
                        value={ points.present.path } />
              </div>
            </div>
          </div>;
}
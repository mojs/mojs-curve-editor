import { h } from 'preact';
import Curve from './curve';
import ResizeHandle from './resize-handle';

const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

const CurveEditorRight = ({state, progressLines, options}) => {
  return (<div className={CLASSES['curve-editor__right']}>
            <Curve state={state} options={options}
                    progressLines={progressLines} />
            <ResizeHandle state ={ state } type="right"
                          className={CLASSES['curve-editor__resize-handle']} />
            <ResizeHandle state ={ state } type="bottom"
                          className={CLASSES['curve-editor__resize-handle']} />
          </div>)
}


export default CurveEditorRight;

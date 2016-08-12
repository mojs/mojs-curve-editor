import { h } from 'preact';
import Curve from './curve';
import ResizeHandle from './resize-handle';

const CLASSES = require('../../css/blocks/curve-editor.postcss.css.json');

const CurveEditorRight = ({state}) => {
  return (<div className={CLASSES['curve-editor__right']}>
            <Curve state ={ state } />
            <ResizeHandle type="top" className={ CLASSES['curve-editor__resize-handle'] } />
            <ResizeHandle type="right" className={ CLASSES['curve-editor__resize-handle'] } />
            <ResizeHandle type="bottom" className={ CLASSES['curve-editor__resize-handle'] } />
          </div>)
}


export default CurveEditorRight;
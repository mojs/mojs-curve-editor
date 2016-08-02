webpackHotUpdatemojs_curve_editor(0,{

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {import './resize-handle';
	import './icons';
	import './icon';
	import './icon-button';
	import './curve';

	riot.tag2('curve-editor', '<icons></icons> <resize-handle type="top"></resize-handle> <resize-handle type="right"></resize-handle> <resize-handle type="bottom"></resize-handle> <div class="{this.CLASSES[\'curve-editor__left\']}"> <icon-button shape="code"></icon-button> <a href="https://github.com/legomushroom/mojs-curve-editor" target="_blank" class="{this.CLASSES[\'curve-editor__mojs-logo\']}"> <icon shape="mojs-logo"></icon> </a> </div> <curve adc="{this.CLASSES[\'curve-editor__right\']}"></curve>', '', 'class="{this.CLASSES[\'curve-editor\']}" riot-style="{this.getStyle()}"', function(opts) {
	'use strict';

	var _this = this;

	__webpack_require__(43);
	this.CLASSES = __webpack_require__(56);

	var Hammer = __webpack_require__(77);

	var _opts = opts;
	var store = _opts.store;

	store.subscribe(this.update.bind(this));

	this.on('mount', function () {
	  var hammertime = new Hammer(_this.root, {});
	  hammertime.on('pan', function (ev) {
	    _this.x = ev.deltaX;
	    _this.y = ev.deltaY;
	    _this.update();
	  });
	  hammertime.on('panend', function (ev) {
	    var x = ev.deltaX;
	    var y = ev.deltaY;
	    var translate = store.getState().present.translate;

	    _this.x = _this.y = 0;
	    store.dispatch({ type: 'EDITOR_TRANSLATE', data: { x: translate.x + x, y: translate.y + y } });
	  });
	});

	this.getStyle = function () {
	  var translate = store.getState().present.translate;
	  var x = (_this.x || 0) + translate.x;
	  var y = (_this.y || 0) + translate.y;
	  var transform = 'transform: translate(' + x + 'px, ' + y + 'px)';

	  return '' + mojs.h.prefix.css + transform + '; ' + transform;
	};
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }

})
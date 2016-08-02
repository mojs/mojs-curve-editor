webpackHotUpdatemojs_curve_editor(0,{

/***/ 82:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {import store from '../store';

	riot.tag2('resize-handle', '<icon shape="ellipsis"></icon>', '', 'class="{this.applyClass}"', function(opts) {
	'use strict';

	var _this = this;

	var CLASSES = __webpack_require__(85);
	var Hammer = __webpack_require__(77);

	this.applyClass = CLASSES['resize-handle'] + ' ' + (opts.adc || '');
	this.applyClass = this.applyClass + ' ' + CLASSES['resize-handle--' + this.opts.type];
	__webpack_require__(83);
	__webpack_require__(50);

	// var store = require('../store').default;

	this.on('mount', function () {
	  var hammertime = new Hammer(_this.root, {});
	  hammertime.on('pan', function (ev) {
	    var x = ev.deltaX,
	        y = ev.deltaY;
	    console.log(store);
	    store.dispatch({ type: 'EDITOR_RESIZE', data: { x: x, y: y } });
	  });
	  hammertime.on('panend', function (ev) {
	    var x = ev.deltaX,
	        y = ev.deltaY;
	    console.log(store);
	    store.dispatch({ type: 'EDITOR_RESIZE_END', data: { x: x, y: y } });
	  });
	});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }

})
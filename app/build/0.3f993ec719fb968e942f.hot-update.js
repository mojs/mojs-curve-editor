webpackHotUpdatemojs_curve_editor(0,{

/***/ 78:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {
	riot.tag2('curve', '<div> <svg width="358" height="358" viewbox="0 0 100 100" class="{this.CLASSES[\'curve__svg\']}"> </svg> </div>', '', 'class="{this.CLASSES[\'curve\'] + \' \' + (opts.adc || \'\')}"', function(opts) {
	    this.CLASSES = __webpack_require__(81);
	    __webpack_require__(79);

	    this.getStyle = () => {
	      const state = store.getState().present;
	      let {tempResize_top} = state;

	      if (378 - tempResize_top < 378) { tempResize_top = 0; }

	      const transform = `transform: translate(0px, ${tempResize_top}px)`;

	      return `${mojs.h.prefix.css}${transform}; ${transform};`;
	    }

	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }

})
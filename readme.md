# mojs curve editor

<img width="444" src="https://github.com/legomushroom/mojs-curve-editor/blob/master/mockups/curve-editor.png?raw=true" alt="mojs-curve-editor" />

`MojsCurveEditor` is a GUI plugin for interactive `custom easings`/`property curves` editing while crafting your animations. Part of `mojs` tools.

## Installation

The `MojsCurveEditor` depends on `mojs >= 0.225.2`, tween autoupdates available for `mojs >= 0.276.2`. Please make sure you've linked [mojs](https://github.com/legomushroom/mojs) library first.

[CDN](https://www.jsdelivr.com/)(pending approval):

```
<script src="//cdn.jsdelivr.net/mojs-curve-editor/latest/mojs-curve-editor.min.js"></script>
```

[NPM](https://www.npmjs.com/):

```
[sudo] npm install mojs-curve-editor
```

[Bower](http://bower.io/):

```
bower install mojs-curve-editor
```

Import `MojsCurveEditor` constructor to your code (depends on your environment) :

```javascript
const MojsCurveEditor = require('mojs-curve-editor').default;
// or
import MojsCurveEditor from 'mojs-curve-editor';
```

If you installed it with script link - you should have `MojsCurveEditor` global.

## Usage

Construct `MojsCurveEditor` with the next options:

```javascript
  const mojsCurve = new MojsCurveEditor({
    // Name of the Curve you are working on. The name is used to
    // identify record in `localStorage` to restore the state from
    // when page gets reloaded, so please specify unique names if
    // you use more than one editor on the same page.
    name:         'bounce curve'
  });
```

After that you can "connect" the curve with your `mojs` modules by passing a "sample" of the curve to the `easing` property of the modules like this:

```javascript
  const mojsCurve = new MojsCurveEditor();

  const tween = new mojs.Tween({
    easing: mojsCurve.getEasing()
  });

  // or

  const shape = new mojs.Shape({
    easing: mojsCurve.getEasing()
  });

  // or as `property curve`

  const html = new mojs.Html({
    el:     '#js-el',
    x:      { 100: 100, curve: mojsCurve.getEasing() }
  });

```

Each `tween`/`module` should have it's out sample of the curve, this means you need to call `mojsCurve.getEasing()` send the `sample` of the curve to the `easing` property of modules.  

If you use `mojs>0.276.5` the state of the modules with the curve `sample` will be updated automatically.

The `getEasing` function receives options hash:

```javascript
  // ...
  easing: mojsCurve.getEasing({
    // `transform` function that pipes thru the current value
    // of the curve so you can transform it
    transform: (k) => { return k; }
  });
  // ...

```

After you are happy with the curve you made, you need to change the `sample`(`mojsCurve.getEasing()` calls) with actual path data which you can get by clicking on the `code` button (<img width="32" style="margin-bottom: -10px" src="https://github.com/legomushroom/mojs-curve-editor/blob/master/mockups/code-button.png?raw=true" alt="code button" />):

```javascript
  const html = new mojs.Html({
    el:     '#js-el',
    // after the change
    x:      { 0: 100, easing: 'M0, 100 C0, 100 19.8984745544779, 40.10152544552211 30, 30 C40.1015254455221, 19.89847455447789 80, 45 80, 45 C80, 45 100, 0 100, 0 ' }
  });
```

## Options

Constructor accepts the next options:

```javascript
const curveEditor = new MojsCurveEditor({
  // name of the curve editor
  name:         'bounce curve'
  // if should preserve state on page reloads
  isSaveState:  true,
  // callback on path change, accepts path string
  onChange:     function (path) {}
  // if should hide when minimized - useful when you try to embed the
  isHiddenOnMin: false
});
```

## Public Methods

```javascript
curveEditor
  // gets `easing function` of the curve
  .getEasing()
  // maximizes the curve editor
  .maximize()
  // minimizes the curve editor
  .minimize()
  // toggles `maximize/minimize` methods regarding editor's state
  .toggleSize();
```

## Shortcuts

- `alt + z`  - `undo` curve action
- `alt + x`  - `rendo` curve action
- `alt + d`  - `delete` selected point(s)
- [3 times] `alt + \`  - `reset` curve

`Please note:` all shortcuts work only for active editor - it should have `orange mojs logo indicator` at bottom left.

## Development

Install [webpack](https://webpack.github.io/) globally:

```
[sudo] npm install webpack -g
```

Install dependencies with [npm](https://www.npmjs.com/):

```
[sudo] npm install
```

Run [webpack](https://webpack.github.io/):

```
webpack
```

Please make sure you started a `feature branch` with the `feature name` (better from the `dev` branch) before making changes.

## License

(The MIT License)

Copyright (c) Oleg Solomka [@LegoMushroom](https://twitter.com/legomushroom) [legomushroom@gmail.com](mailto:legomushroom@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

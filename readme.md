# mojs Curve Editor

<img src="https://github.com/legomushroom/mojs-curve-editor/blob/master/mockups/curve-editor.png?raw=true" alt="mojs-curve-editor" />

`MojsCurveEditor` is a GUI plugin for interactive `custom easings`/`property curves` editing while crafting your animations. Part of `mojs` tools.

## Installation

The `MojsCurveEditor` depends on `mojs >= 0.225.2`, holding tween autoupdates available for `mojs >= 0.276.2`. Please make sure you've linked `mojs` library first.

[CDN](https://www.jsdelivr.com/):

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
const MojsCurveEditor = require('mojs-player').default;
// or
import MojsCurveEditor from 'mojs-player';
```

If you installed it with script link - you should have `MojsCurveEditor` global.

## Usage

Construct `MojsCurveEditor` with the next options:

```javascript
  const mojsCurve = new MojsCurveEditor({
    // Name of the Curve you are working on. The name is used to
    // idetify record in `localStorage` to resore the state from
    // when page gets reloaded, so please specify unique names if 
    // you use more than one editor on the same page.
    name:         'bounce curve',
    // if should preserve state on page reloads
    isSaveState:  true
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

The `getEasing` function recieves options hash:

```javascript
  // ...
  easing: mojsCurve.getEasing({
    // `transform` function that pipes thru the current value
    // of the curve so you can transform it
    transform: (k) => { return k; }
  });
  // ...

```

## Shortcuts

- `alt + z`  - `undo` curve action
- `alt + x`  - `rendo` curve action
- `alt + r`  - `remove` selected point(s)
- `alt + s`  - set selected point(s) to `straight` type
- `alt + d`  - set selected point(s) to `disconnected` type
- `alt + m`  - set selected point(s) to `mirrored` type
- `alt + a`  - set selected point(s) to `asymmetric` type

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


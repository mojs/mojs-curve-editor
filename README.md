# @mojs/curve-editor – [![npm](https://img.shields.io/npm/v/@mojs/curve-editor.svg)](https://www.npmjs.com/package/@mojs/curve-editor)

GUI for live easing/property curves editing.

![mojs-curve-editor](logo.png "mojs-curve-editor")

`MojsCurveEditor` is a GUI plugin for interactive custom easings and property curves editing while crafting your animations. It is part of [`mojs` tools](https://mojs.github.io/tools/).

## Installation

The `MojsCurveEditor` depends on `mojs >= 0.225.2`, tween autoupdates available for `mojs >= 0.276.2`. Please make sure you've linked [mojs](https://github.com/mojs/mojs) library first.

```console
# npm
npm install @mojs/curve-editor

# cdn
<script src="https://cdn.jsdelivr.net/npm/@mojs/curve-editor"></script>
```

Import `MojsCurveEditor` constructor inside your code, depending on your environment:

```javascript
const MojsCurveEditor = require('mojs-curve-editor').default;

// or
import MojsCurveEditor from '@mojs/curve-editor';
```

> If you installed it with script link - you should have `MojsCurveEditor` global

## Usage

Construct `MojsCurveEditor` with the next options:

```javascript
  const mojsCurve = new MojsCurveEditor({

    // name of the Curve you are working on. The name is used to
    // identify record in `localStorage` to restore the state from
    // when page gets reloaded, so please specify unique names if
    // you use more than one editor on the same page.
    name: 'bounce curve'
  });
```

After that you can "connect" the curve with your `mojs` modules by passing a "sample" of the curve to the `easing` property of the module, like this:

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
    el: '#js-el',
    x: {
      0: 100,
      curve: mojsCurve.getEasing()
    }
  });

```

Each `tween`/`module` should have it's out sample of the curve, this means you need to call `mojsCurve.getEasing()` send the `sample` of the curve to the `easing` property of modules.  

If you use `mojs>0.276.5` the state of the modules with the curve `sample` will be updated automatically.

The `getEasing` function receives options hash:

```javascript
  easing: mojsCurve.getEasing({

    // `transform` function that pipes through the current value
    // of the curve so you can transform it
    transform: (k) => { return k; }
  });

```

After you are happy with the curve you made, you need to change the `sample`, `mojsCurve.getEasing()` calls, with the actual path data that you can get by clicking on the `code` button <img width="32" style="margin-bottom: -10px" src="https://github.com/mojs/mojs-curve-editor/blob/main/mockups/code-button.png?raw=true" alt="code button" />:

```javascript
  const html = new mojs.Html({
    el: '#js-el',
    x: {
      0: 100,
      easing: 'M0, 100 L100, 0'
    }
  });
```

## Options

Constructor accepts the next options:

```javascript
const curveEditor = new MojsCurveEditor({

  // name of the curve editor
  name: 'bounce curve'

  // if should preserve state on page reloads
  isSaveState: true,

  // start path - will be loaded on initialization of the curve,
  // e.g. before any user modifications were made. Path of 'M0, 100 L100, 0' is set by default.
  startPath: 'M0, 100 L100, 0',

  // callback on path change, accepts path string
  onChange: function (path) {},

  // if should hide when minimized - useful when you try to embed
  isHiddenOnMin: false
});
```

## Public Methods

```javascript
curveEditor

  // get `easing function` of the curve
  .getEasing()

  // maximize the curve editor
  .maximize()

  // minimize the curve editor
  .minimize()

  // toggle `maximize/minimize` methods regarding editor's state
  .toggleSize();
```

## Shortcuts

- `alt + z`  - `undo` curve action
- `alt + x`  - `redo` curve action
- `alt + d`  - `delete` selected point(s)
- [3 times] `alt + \`  - `reset` curve

> All shortcuts work only for active editor - it should have **orange mojs logo indicator** at bottom left.

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

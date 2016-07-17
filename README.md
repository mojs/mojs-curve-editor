react-redux-boilerplate
=====================

Great boilerplate for fast creating React/Redux Applications.


### Dev mode

```
npm install
npm start
open http://localhost:3008
```

### Production mode

```
npm install
npm run build
copy
```

### File locations

* Routes into: `src/index.js`
* Styles into `src/containers/styles`
* Forms  into `src/containers/forms`

### Using `0.0.0.0` as Host

You may want to change the host in `server.js` and `webpack.config.js` from `localhost` to `0.0.0.0` to allow access from same WiFi network. This is not enabled by default because it is reported to cause problems on Windows. This may also be useful if you're using a VM.

### Dependencies

* React ^15.0.1
* React-router
* React-gravatar
* React-hot-loader
* React-tinymce
* Redux
* Redux Form
* Simple auth using localStorage
* Webpack
* Babel

### Roadmap

* Add more components
* Add Isomorphic functional
* ...

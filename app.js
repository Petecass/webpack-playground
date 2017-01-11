webpackJsonp([0],{

/***/ 18:
/***/ function(module, exports) {



module.exports = function component() {
  var element = document.createElement('h1');

  element.className = 'pure-button';
  element.innerHTML = 'Hello world';

  return element;
};

/***/ },

/***/ 19:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__styles_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__styles_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__component__);




var demoComponent = __WEBPACK_IMPORTED_MODULE_2__component___default()();

document.body.appendChild(demoComponent);

// HMR interface
if (false) {
  // Capture hot update
  module.hot.accept('./component', function () {
    // We have to go through CommonJS here and capture the
    // default export explicitly!
    /* eslint-disable global-require */
    var nextComponent = require('./component').default();
    /* eslint-able global-require */
    // Replace old content with the hot loaded one
    document.body.replaceChild(nextComponent, demoComponent);

    demoComponent = nextComponent;
  });
}

/***/ }

},[34]);
//# sourceMappingURL=app.js.map
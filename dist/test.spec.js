/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./__test__/test.spec.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./__test__/test.spec.js":
/*!*******************************!*\
  !*** ./__test__/test.spec.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index */ \"./src/index.js\");\nfunction _templateObject() {\n  var data = _taggedTemplateLiteral([\"TEST_VALUE\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/* global describe test expect */\n\n/* eslint no-unused-expressions: 0 */\n\n/*\n * import actions from \"./actions\"\n\n  const initState = {\n    deployments: {},\n    history: {},\n    loading: false\n  }\n\n  export default function reducer(state = initState, action) {\n    switch (action.type) {\n      case actions.DEPLOYMENT_LOAD:\n        return {\n          ...state,\n          loading: true,\n          deployments: Object.assign({}, state.deployments, {\n            [action.payload.name]: null\n          })\n        }\n      case actions.DEPLOYMENT_SUCCESS_RESULT:\n        return {\n          ...state,\n          loading: false,\n          deployments: Object.assign({}, state.deployments, {\n            [action.payload.name]: action.payload.result\n          })\n        }\n      case actions.HISTORY_LOAD:\n        return {\n          ...state,\n          loading: true,\n          history: Object.assign({}, state.history, {\n            [action.payload.host]: {\n              [action.payload.asset]: null\n            }\n          })\n        }\n      case actions.HISTORY_SUCCESS_RESULT:\n        return {\n          ...state,\n          loading: false,\n          history: Object.assign({}, state.history, {\n            [action.payload.host]: {\n              [action.payload.asset]: action.payload.result\n            }\n          })\n        }\n      default:\n        return state\n    }\n  }\n */\n\ndescribe('terse-redux', function () {\n  test('type should be exposed', function () {\n    expect(_typeof(_src_index__WEBPACK_IMPORTED_MODULE_0__[\"type\"])).toEqual('function');\n  });\n  test('reduce should be exposed', function () {\n    expect(_typeof(_src_index__WEBPACK_IMPORTED_MODULE_0__[\"reduce\"])).toEqual('function');\n  });\n  test('type should accept tag template and reduce function', function () {\n    var a = Object(_src_index__WEBPACK_IMPORTED_MODULE_0__[\"type\"])(_templateObject());\n  });\n});\n\n//# sourceURL=webpack:///./__test__/test.spec.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: type, reduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"type\", function() { return type; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reduce\", function() { return reduce; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ReduxTypeAction =\n/*#__PURE__*/\nfunction () {\n  function ReduxTypeAction(name) {\n    _classCallCheck(this, ReduxTypeAction);\n\n    this.name = Array.isArray(name) ? name[0] : name;\n  }\n\n  _createClass(ReduxTypeAction, [{\n    key: \"newup\",\n    value: function newup(state) {}\n  }]);\n\n  return ReduxTypeAction;\n}();\n\nvar type = function type(name) {\n  return new ReduxTypeAction(name);\n};\nvar reduce = function reduce() {\n  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];\n  return function (state, action) {\n    return handlers.filter(function (handler) {\n      return handler.name === action.type;\n    }).reduce(function (base, handler) {\n      return Object.assign({}, base);\n    }, state || initialState);\n  };\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
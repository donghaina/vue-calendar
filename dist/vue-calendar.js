(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueCalendar", [], factory);
	else if(typeof exports === 'object')
		exports["VueCalendar"] = factory();
	else
		root["VueCalendar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(7)
}
var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(6),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vue-calendar',
  data() {
    return {
      calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth(),
      selectedDate: new Date().getDate()
    };
  },
  methods: {
    displayDaysPerMonth(year, month) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        daysInMonth[1] = 29;
      }
      let targetDay = new Date(year, month, 1).getDay();
      let total_calendar_list = [];
      let preNum = targetDay;
      let nextNum = 0;
      if (targetDay > 0) {
        for (let i = 0; i < preNum; i++) {
          let obj = {
            type: "pre",
            content: ""
          };
          total_calendar_list.push(obj);
        }
      }
      for (let i = 0; i < daysInMonth[month]; i++) {
        let obj = {
          type: "normal",
          content: i + 1
        };
        total_calendar_list.push(obj);
      }

      // if (total_calendar_list.length > 35) {
      //   nextNum = 42 - total_calendar_list.length;
      // } else {
      //   nextNum = 35 - total_calendar_list.length;
      // }

      // if (month === 1 && new Date(year, month, 0).getDay() === 6) {
      //   nextNum = 0
      // }

      nextNum = 6 - new Date(year, month + 1, 0).getDay();

      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "next",
          content: ""
        };
        total_calendar_list.push(obj);
      }
      return total_calendar_list;
    },
    displayDaysPerMonthT(year) {
      //定义每个月的天数，如果是闰年第二月改为29天
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
        daysInMonth[1] = 29;
      }

      let daysPreMonth = [].concat(daysInMonth);
      daysPreMonth.unshift(daysPreMonth.pop());

      let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
        let day = new Date(year, index, 1).getDay();
        if (day === 0) {
          return 6;
        } else {
          return day - 1;
        }
      });

      let total_calendar_list = new Array(12).fill([]).map((month, monthIndex) => {
        let addDays = addDaysFromPreMonth[monthIndex] + 1,
            daysCount = daysInMonth[monthIndex],
            daysCountPre = daysPreMonth[monthIndex],
            monthDate = [];

        if (addDays >= 7) {
          addDays = addDays - 7;
        }

        for (; addDays > 0; addDays--) {
          let obj = {
            content: daysCountPre--,
            type: "pre"
          };

          monthDate.unshift(obj);
        }

        for (let i = 0; i < daysCount;) {
          let obj = {
            content: ++i,
            type: "normal"
          };

          monthDate.push(obj);
        }
        if (monthDate.length > 35) {
          for (let i = 42 - monthDate.length, j = 0; j < i;) {
            let obj = {
              content: ++j,
              type: "next"
            };

            monthDate.push(obj);
          }
        } else {
          for (let i = 35 - monthDate.length, j = 0; j < i;) {
            let obj = {
              content: ++j,
              type: "next"
            };

            monthDate.push(obj);
          }
        }
        return monthDate;
      });
      return total_calendar_list;
    },
    handleDayClick(item) {
      if (item.type === 'normal') {
        // do anything...
        this.selectedDate = Number(item.content);
      }
    },
    handlePreMonth() {
      if (this.selectedMonth === 0) {
        this.selectedYear = this.selectedYear - 1;
        this.selectedMonth = 11;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth - 1;
        this.selectedDate = 1;
      }
    },
    handleNextMonth() {
      if (this.selectedMonth === 11) {
        this.selectedYear = this.selectedYear + 1;
        this.selectedMonth = 0;
        this.selectedDate = 1;
      } else {
        this.selectedMonth = this.selectedMonth + 1;
        this.selectedDate = 1;
      }
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calendar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__calendar_vue__);
 // 导入组件
const VueCalendar = {
    install(Vue, options) {
        Vue.component(__WEBPACK_IMPORTED_MODULE_0__calendar_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__calendar_vue___default.a); // vuePayKeyboard.name 组件的name属性
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    }
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueCalendar);
}
/* harmony default export */ __webpack_exports__["default"] = (VueCalendar); // 导出..

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".mywk__calendar{width:100%;max-width:480px;margin:0 auto;display:flex;justify-content:space-around;flex-wrap:wrap}.tips{margin:15px 0 0;text-align:center}.calendar{flex-shrink:0;width:94.66667vw;max-width:454.4px;display:flex;flex-direction:column;align-items:center;margin:15px 0 20px;border-radius:4px;background-color:#fff;box-shadow:0 0 10px hsla(0,0%,82%,.5)}.calendar .calendar__header{color:#2c3135;font-size:16px;width:84vw;max-width:403.2px;display:flex;align-items:center;justify-content:space-between;line-height:22px;margin-top:17px}.calendar .calendar__header .header__title{font-size:16px;letter-spacing:1px}.calendar .calendar__header .header__pre{height:12px;width:12px;position:relative}.calendar .calendar__header .header__pre:after{content:\" \";display:inline-block;height:9px;width:9px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;transform:matrix(.71,.71,-.71,.71,0,0) rotate(180deg);position:absolute;top:50%;margin-top:-4px;right:2px}.calendar .calendar__header .header__next{height:12px;width:12px;position:relative}.calendar .calendar__header .header__next:after{content:\" \";display:inline-block;height:9px;width:9px;border-width:2px 2px 0 0;border-color:#c8c8cd;border-style:solid;transform:matrix(.71,.71,-.71,.71,0,0);position:absolute;top:50%;margin-top:-4px;right:2px}.calendar .calendar__main{width:84vw;max-width:403.2px;display:flex;justify-content:space-around;flex-wrap:wrap;padding-top:19px}.calendar .calendar__main .main__block{width:11.73333vw;height:11.73333vw;max-width:56.32px;max-height:56.32px;margin-bottom:15px;border-radius:2px;font-size:12px;display:flex;align-items:center;justify-content:center;color:#666;background-color:#fff;flex-shrink:0;box-shadow:0;position:relative}.calendar .calendar__main .main__block .main__block-piont{width:5px;height:5px;border-radius:50%;background-color:#f93d3a;position:absolute;left:calc(50% - 2.5px);bottom:0}.calendar .calendar__main .main__block-not{background-color:#edf2f5;color:#7f8fa4}.calendar .calendar__main .main__block-today{transition:all .5s;background-color:#f93d3a;color:#fff;box-shadow:0 2px 6px hsla(0,0%,67%,.5)}.calendar .calendar__main .main__block-head{width:11.73333vw;height:11.73333vw;max-width:56.32px;max-height:56.32px;margin-bottom:15px;border-radius:2px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#7f8fa4;background-color:#fff;flex-shrink:0}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mywk__calendar"
  }, [_c('p', {
    staticClass: "tips"
  }, [_vm._v("日历类型--计算单月数据")]), _vm._v(" "), _c('div', {
    staticClass: "calendar"
  }, [_c('div', {
    staticClass: "calendar__header"
  }, [_c('div', {
    staticClass: "header__pre",
    on: {
      "click": _vm.handlePreMonth
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "header__title"
  }, [_vm._v("\n          " + _vm._s(_vm.selectedYear) + "年" + _vm._s(_vm.selectedMonth + 1) + "月" + _vm._s(_vm.selectedDate) + "日\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "header__next",
    on: {
      "click": _vm.handleNextMonth
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "calendar__main"
  }, [_vm._l((_vm.calendarHeader), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "main__block-head"
    }, [_vm._v("\n        " + _vm._s(item) + "\n      ")])
  }), _vm._v(" "), _vm._l((_vm.displayDaysPerMonth(_vm.selectedYear, _vm.selectedMonth)), function(item, index) {
    return _c('div', {
      key: item.type + item.content + "" + index,
      class: ("main__block " + (item.content === _vm.selectedDate && 'main__block-today')),
      on: {
        "click": function($event) {
          return _vm.handleDayClick(item)
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.content) + "\n      ")])
  })], 2)]), _vm._v(" "), _c('p', {
    staticClass: "tips"
  }, [_vm._v("日历类型--计算整年数据")]), _vm._v(" "), _c('div', {
    staticClass: "calendar"
  }, [_c('div', {
    staticClass: "calendar__header"
  }, [_c('div', {
    staticClass: "header__pre",
    on: {
      "click": _vm.handlePreMonth
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "header__title"
  }, [_vm._v("\n          " + _vm._s(_vm.selectedYear) + "年" + _vm._s(_vm.selectedMonth + 1) + "月" + _vm._s(_vm.selectedDate) + "日\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "header__next",
    on: {
      "click": _vm.handleNextMonth
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "calendar__main"
  }, [_vm._l((_vm.calendarHeader), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "main__block-head"
    }, [_vm._v("\n        " + _vm._s(item) + "\n      ")])
  }), _vm._v(" "), _vm._l((_vm.displayDaysPerMonthT(_vm.selectedYear)[_vm.selectedMonth]), function(item, index) {
    return _c('div', {
      key: item.type + item.content + "" + index,
      class: ("main__block " + ((item.type === 'pre' || item.type === 'next') ? 'main__block-not' : '') + " " + ((item.content === _vm.selectedDate && item.type === 'normal') && 'main__block-today')),
      on: {
        "click": function($event) {
          return _vm.handleDayClick(item)
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.content) + "\n      ")])
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("68413a70", content, true, {});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(9)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-calendar.js.map
webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var malarkey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! malarkey */ "./node_modules/malarkey/index.js");
/* harmony import */ var malarkey__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(malarkey__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lib_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/icons */ "./lib/icons.js");





var _jsxFileName = "/Users/zeno/Projects/dracula/dracula.github.io/components/Header.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;




var Header =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Header, _Component);

  function Header(props) {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Header);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Header).call(this, props));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log(this.node);

      if (this.node) {
        malarkey__WEBPACK_IMPORTED_MODULE_6___default()(this.node, {
          typeSpeed: 50,
          deleteSpeed: 50
        }).type('Visual Studio Code').pause()["delete"]().type('Sublime').pause()["delete"]().type('Vim').pause()["delete"]().type('iTerm').pause()["delete"]().type('Atom').pause()["delete"]().type('Slack').pause()["delete"]().type('Zsh').pause()["delete"]().type('Terminal.app').pause()["delete"]().type('Alfred').pause()["delete"]().type('CodeMirror').pause()["delete"]().type('Xcode').pause()["delete"]().type('Coda').pause()["delete"]().type('TextMate').pause()["delete"]().type('Emacs').pause()["delete"]().type('JetBrains').pause()["delete"]().type('Visual Studio').pause()["delete"]();
      }
    }
  }, {
    key: "renderDescription",
    value: function renderDescription() {
      var _this = this;

      if (this.props.query.repo) {
        return __jsx("h2", {
          className: "subtitle",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }, "A dark theme for ", this.props.query.title, " ", __jsx("a", {
          href: "/",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          },
          __self: this
        }, "and ", this.props.query.total, "+ apps"));
      }

      return __jsx("h2", {
        className: "subtitle",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, "A dark theme for ", __jsx("span", {
        ref: function ref(node) {
          return _this.node = node;
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return __jsx("header", {
        className: "header row center-xs",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 45
        },
        __self: this
      }, __jsx("div", {
        className: "col-xs-12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, __jsx("a", {
        href: "/",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 47
        },
        __self: this
      }, __jsx("img", {
        className: "icon",
        src: "/static/img/icons/".concat(this.props.query.icon),
        width: _lib_icons__WEBPACK_IMPORTED_MODULE_7__["default"][this.props.query.icon].width,
        height: _lib_icons__WEBPACK_IMPORTED_MODULE_7__["default"][this.props.query.icon].height,
        alt: this.props.query.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }), __jsx("h1", {
        className: "title",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }, "Dracula")), this.renderDescription(), __jsx("p", {
        className: "gh-btns",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        },
        __self: this
      }, __jsx("iframe", {
        src: "https://ghbtns.com/github-btn.html?user=dracula&repo=dracula-theme&type=watch&count=true&size=large",
        title: "GitHub Stars",
        allowtransparency: "true",
        frameBorder: "0",
        scrolling: "0",
        width: "152",
        height: "30",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        },
        __self: this
      }), __jsx("iframe", {
        src: "https://ghbtns.com/github-btn.html?user=dracula&repo=dracula-theme&type=fork&count=true&size=large",
        title: "GitHub Forks",
        allowtransparency: "true",
        frameBorder: "0",
        scrolling: "0",
        width: "156",
        height: "30",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }))));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ })

})
//# sourceMappingURL=index.js.6938034f604c6c9fbd76.hot-update.js.map
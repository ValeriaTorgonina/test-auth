/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/api.js":
/*!********************!*\
  !*** ./app/api.js ***!
  \********************/
/*! namespace exports */
/*! export Api [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Api\": () => /* binding */ Api\n/* harmony export */ });\nclass Api {\n  getUsers() {\n    return fetch('/users').then(response => response.json());\n  }\n\n  registerUser(login, password) {\n    return this._getUser('/users', login, password);\n  }\n\n  loginUser(login, password) {\n    return this._getUser('/auth/login', login, password);\n  }\n\n  _getUser(url, login, password) {\n    return fetch(url, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify({\n        login,\n        password\n      })\n    }).then(response => {\n      if (response.status.toString().includes('40')) {\n        throw new Error(response.status);\n      }\n\n      return response.json();\n    });\n  }\n\n}\n\n//# sourceURL=webpack://auth-frontend-lesson/./app/api.js?");

/***/ }),

/***/ "./app/auth-controller.component.js":
/*!******************************************!*\
  !*** ./app/auth-controller.component.js ***!
  \******************************************/
/*! namespace exports */
/*! export AuthController [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthController\": () => /* binding */ AuthController\n/* harmony export */ });\nconst AUTH_STATE = {\n  REGISTRATION: \"registration\",\n  AUTHORISATION: \"authorisation\"\n};\nconst ERRORS_TEXT = {\n  EMPTY_INPUT: 'заполните поле логина и пароля',\n  INVALID_LOGIN_OR_PASS: 'неверный логин или пароль',\n  LOGIN_ALREADY_EXIST: 'такой пользователь уже существует'\n};\nclass AuthController {\n  constructor(api, elem) {\n    this.api = api;\n    this.authState = AUTH_STATE.REGISTRATION;\n    this.formElem = elem;\n    this.formElem.addEventListener(\"submit\", e => this.onSumbit(e));\n    this.exitBtn = document.body.querySelector('#exit');\n    this.exitBtn.addEventListener(\"click\", () => this.exit());\n    this.navElem = this.formElem.querySelector(\".btn-group\");\n    this.navElem.addEventListener(\"click\", e => this.toggleAuthState(e));\n    this.errorElem = this.formElem.querySelector(\".error\");\n  }\n\n  exit() {\n    localStorage.removeItem(\"user\");\n    document.dispatchEvent(new CustomEvent(\"onExit\"));\n  }\n\n  showExitBtn() {\n    this.exitBtn.style.display = 'block';\n  }\n\n  hideExitBtn() {\n    this.exitBtn.style.display = 'none';\n  }\n\n  toggleAuthState(e) {\n    const navBtn = e.target.closest(\"button\");\n\n    if (navBtn) {\n      this.authState = navBtn.dataset.authState;\n      this.changeActiveNavBtn();\n      this.changeSubmitBtnText();\n    }\n  }\n\n  changeActiveNavBtn() {\n    this.navElem.querySelector(\".btn.active\").classList.remove(\"active\");\n    this.navElem.querySelector(`#${this.authState}`).classList.add(\"active\");\n  }\n\n  changeSubmitBtnText() {\n    const submitBtn = this.formElem.querySelector(\".btn-submit\");\n\n    if (this.authState === AUTH_STATE.AUTHORISATION) {\n      submitBtn.textContent = \"войти\";\n    } else {\n      submitBtn.textContent = \"зарегистрироваться\";\n    }\n  }\n\n  registerUser(login, password) {\n    this.api.registerUser(login, password).then(user => {\n      localStorage.setItem(\"user\", JSON.stringify(user));\n      document.dispatchEvent(new CustomEvent(\"onLogin\"));\n      this.hideError();\n    }).catch(error => this.showError(ERRORS_TEXT.LOGIN_ALREADY_EXIST));\n  }\n\n  loginUser(login, password) {\n    this.api.loginUser(login, password).then(user => {\n      localStorage.setItem(\"user\", JSON.stringify(user));\n      document.dispatchEvent(new CustomEvent(\"onLogin\"));\n      this.hideError();\n    }).catch(error => this.showError(ERRORS_TEXT.INVALID_LOGIN_OR_PASS));\n  }\n\n  onSumbit(e) {\n    e.preventDefault();\n    const {\n      login,\n      password\n    } = this.getValues();\n\n    if (login !== \"\" && password !== \"\") {\n      this.hideError();\n\n      if (this.authState === AUTH_STATE.AUTHORISATION) {\n        this.loginUser(login, password);\n      } else {\n        this.registerUser(login, password);\n      }\n    } else {\n      showError(ERRORS_TEXT.EMPTY_INPUT);\n    }\n  }\n\n  showError(errorText) {\n    this.errorElem.style.display = \"block\";\n    this.errorElem.textContent = errorText;\n  }\n\n  hideError() {\n    this.errorElem.style.display = \"none\";\n  }\n\n  getValues() {\n    const login = this.formElem.querySelector(\"#login\").value;\n    const password = this.formElem.querySelector(\"#password\").value;\n    return {\n      login,\n      password\n    };\n  }\n\n}\n\n//# sourceURL=webpack://auth-frontend-lesson/./app/auth-controller.component.js?");

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _auth_controller_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-controller.component.js */ \"./app/auth-controller.component.js\");\n/* harmony import */ var _users_table_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./users-table.component.js */ \"./app/users-table.component.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./app/api.js\");\n\n\n\n\nclass App {\n  constructor() {\n    this.api = new _api_js__WEBPACK_IMPORTED_MODULE_2__.Api();\n    this.form = document.body.querySelector('form');\n    this.table = document.body.querySelector('table');\n    this.authController = new _auth_controller_component_js__WEBPACK_IMPORTED_MODULE_0__.AuthController(this.api, this.form);\n    this.usersTable = new _users_table_component_js__WEBPACK_IMPORTED_MODULE_1__.UsersTable(this.table);\n    this.checkIfUserExist();\n    document.addEventListener('onLogin', () => this.getUsers());\n    document.addEventListener('onExit', () => this.showForm());\n  }\n\n  checkIfUserExist() {\n    if (JSON.parse(localStorage.getItem(\"user\"))) {\n      this.getUsers();\n    } else {\n      this.showForm();\n    }\n  }\n\n  showTable() {\n    this.form.style.display = 'none';\n    this.table.style.display = 'block';\n    this.authController.showExitBtn();\n  }\n\n  showForm() {\n    this.form.style.display = 'block';\n    this.table.style.display = 'none';\n    this.authController.hideExitBtn();\n  }\n\n  getUsers() {\n    this.api.getUsers().then(users => {\n      this.usersTable.drawUsers(users);\n      this.showTable();\n    }).catch(error => console.error(error));\n  }\n\n}\n\nnew App();\n\n//# sourceURL=webpack://auth-frontend-lesson/./app/index.js?");

/***/ }),

/***/ "./app/users-table.component.js":
/*!**************************************!*\
  !*** ./app/users-table.component.js ***!
  \**************************************/
/*! namespace exports */
/*! export UsersTable [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UsersTable\": () => /* binding */ UsersTable\n/* harmony export */ });\nclass UsersTable {\n  constructor(table) {\n    this._table = table;\n  }\n\n  drawUsers(users) {\n    const usersRows = users.map(({\n      id,\n      login,\n      role\n    }, i) => {\n      return `\n                <tr>\n                    <th scope=\"row\">${i + 1}</th>\n                    <td>${login}</td>\n                    <td>${id}</td>\n                    <td>${role}</td>\n                </tr>\n            `;\n    }).join();\n    this._table.querySelector('tbody').innerHTML = usersRows;\n  }\n\n}\n\n//# sourceURL=webpack://auth-frontend-lesson/./app/users-table.component.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./app/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
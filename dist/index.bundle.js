/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/form.scss"
/*!*****************************!*\
  !*** ./src/style/form.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/form.scss?\n}");

/***/ },

/***/ "./src/style/index.scss"
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/index.scss?\n}");

/***/ },

/***/ "./src/style/menu.scss"
/*!*****************************!*\
  !*** ./src/style/menu.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/menu.scss?\n}");

/***/ },

/***/ "./src/js-ts/form.ts"
/*!***************************!*\
  !*** ./src/js-ts/form.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchForm: () => (/* binding */ fetchForm)\n/* harmony export */ });\nfunction fetchForm() {\n    return fetch(\"form.html\")\n        .then(res => res.text())\n        .then(html => {\n        const divForm = document.getElementById(\"contacts\");\n        if (!divForm)\n            return;\n        divForm.innerHTML = html;\n        return divForm;\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/form.ts?\n}");

/***/ },

/***/ "./src/js-ts/index.ts"
/*!****************************!*\
  !*** ./src/js-ts/index.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/index.scss */ \"./src/style/index.scss\");\n/* harmony import */ var _style_menu_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/menu.scss */ \"./src/style/menu.scss\");\n/* harmony import */ var _style_form_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/form.scss */ \"./src/style/form.scss\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu */ \"./src/js-ts/menu.ts\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form */ \"./src/js-ts/form.ts\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    (0,_menu__WEBPACK_IMPORTED_MODULE_3__.setUpMenu)();\n    (0,_form__WEBPACK_IMPORTED_MODULE_4__.fetchForm)();\n});\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/index.ts?\n}");

/***/ },

/***/ "./src/js-ts/menu.ts"
/*!***************************!*\
  !*** ./src/js-ts/menu.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTypeandDataFilterMenu: () => (/* binding */ getTypeandDataFilterMenu),\n/* harmony export */   setUpMenu: () => (/* binding */ setUpMenu)\n/* harmony export */ });\nfunction fetchMenu() {\n    return fetch(\"menu.html\")\n        .then(res => res.text()) //then response in text form\n        .then(html => {\n        const divMenu = document.getElementById(\"menu\");\n        if (!divMenu)\n            return;\n        divMenu.innerHTML = html;\n        return divMenu;\n    });\n}\n// Update hash links to point to index.html if on another page\nfunction changeLinkNavigation(divMenu) {\n    const currentPage = window.location.pathname.split(\"/\").pop() || \"index.html\";\n    if (!divMenu) {\n        throw new Error(\"Element not founded\");\n    }\n    const links = divMenu.querySelectorAll(\"a[data-page]\");\n    links.forEach(link => {\n        const hrefLink = link.getAttribute(\"data-page\");\n        if (hrefLink !== \"universal\") {\n            if (hrefLink == currentPage) {\n                if (link.classList.contains(\"active\")) {\n                    link.classList.replace(\"active\", \"disabled\");\n                }\n            }\n            else {\n                link.classList.replace(\"disabled\", \"active\");\n                // remove listener to prevent click\n                const handler = (event) => event.preventDefault();\n                link.removeEventListener(\"click\", handler);\n            }\n        }\n    });\n    return currentPage;\n}\n//------------------OLD CODE ---------------------//\n/*\nfunction checkMenuSections() {\n    const swimSuitBtn = document.querySelector('a[href=\"#swim_suit\"]') as HTMLElement;\n    const accessoriesBtn = document.querySelector('a[href=\"#accessories\"]') as HTMLElement;\n\n    const swimSuit = document.getElementById(\"swim_suit\") as HTMLElement;\n    const accessories = document.getElementById(\"accessories\") as HTMLElement;\n\n    if (!swimSuit || !accessories || !swimSuitBtn || !accessoriesBtn) return;\n\n    // generic function open/close\n    function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {\n        const isOpen = menuToOpen.dataset.menu === \"open\";\n        menuToOpen.dataset.menu = isOpen ? \"close\" : \"open\";\n        menuToClose.dataset.menu = \"close\";\n    }\n\n\n    function toggleSwimSuit() { toggleMenu(swimSuit, accessories); }\n    function toggleAccessories() { toggleMenu(accessories, swimSuit); }\n\n    // buttons clicks\n    swimSuitBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleSwimSuit(); });\n    accessoriesBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleAccessories(); });\n\n    closeClickOutside(swimSuit, swimSuitBtn, accessories, accessoriesBtn)\n\n}\n\n\n\n\n\n//global event listener to get data-type and value\nexport function getTypeandDataFilterMenu() {\n    document.addEventListener(\"click\", (event) => {\n        const target = event.target as HTMLElement;\n\n        const dropdownItem = target.closest(\"a[data-gender]\") as HTMLAnchorElement;\n        if (!dropdownItem) return;\n\n        event.preventDefault();\n\n        const type = dropdownItem.dataset.type;\n        const gender = dropdownItem.dataset.gender;\n\n        //send data\n        window.location.href = `shop.html?type=${type}&gender=${gender}`;\n\n    });\n}\n\n\nfunction closeClickOutside(swimSuit: HTMLElement, swimSuitBtn: HTMLElement, accessories: HTMLElement, accessoriesBtn: HTMLElement) {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target as HTMLElement;\n        if (\n            !swimSuit.contains(target) &&\n            !swimSuitBtn.contains(target) &&\n            !accessories.contains(target) &&\n            !accessoriesBtn.contains(target)\n        ) {\n            swimSuit.dataset.menu = \"close\";\n            accessories.dataset.menu = \"close\";\n        }\n    });\n}\n\n\n// Final function to export\nexport function setUpMenu() {\n    fetchMenu()\n        .then((divMenu) => {\n            changeLinkNavigation(divMenu as HTMLElement); // upload state link\n            checkMenuSections();\n            getTypeandDataFilterMenu(); inside checkClick\n        })\n        .catch(error => {\n            console.log(\"Error upload state menu\");\n        });\n}\n\n\n*/\n//--------------------NEW CODE-------------------------------//\n// generic function open/close\nfunction toggleMenu(menuToOpen, menuToClose) {\n    const isOpen = menuToOpen.dataset.menu === \"open\";\n    menuToOpen.dataset.menu = isOpen ? \"close\" : \"open\";\n    menuToClose.dataset.menu = \"close\";\n}\n//global event listener to get data-type and value\nfunction getTypeandDataFilterMenu(dropdownItem) {\n    const type = dropdownItem.dataset.type;\n    const gender = dropdownItem.dataset.gender;\n    window.location.href = `shop.html?type=${type}&gender=${gender}`;\n}\nfunction checkClickMenu() {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target;\n        const swimSuitBtn = target.closest('a[href=\"#swim_suit\"]');\n        const accessoriesBtn = target.closest('a[href=\"#accessories\"]');\n        const swimSuit = document.getElementById(\"swim_suit\");\n        const accessories = document.getElementById(\"accessories\");\n        const dropdownItem = target.closest(\"a[data-gender]\");\n        if (swimSuitBtn) {\n            e.preventDefault();\n            toggleMenu(swimSuit, accessories);\n            return;\n        }\n        else if (accessoriesBtn) {\n            e.preventDefault();\n            toggleMenu(accessories, swimSuit);\n            return;\n        }\n        else if (dropdownItem) {\n            e.preventDefault();\n            getTypeandDataFilterMenu(dropdownItem);\n        }\n        else {\n            swimSuit.dataset.menu = \"close\";\n            accessories.dataset.menu = \"close\";\n        }\n    });\n}\n// Final function to export \nfunction setUpMenu() {\n    fetchMenu()\n        .then((divMenu) => {\n        changeLinkNavigation(divMenu); // upload state link \n        checkClickMenu();\n    })\n        .catch(error => {\n        console.log(\"Error upload state menu\");\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/menu.ts?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js-ts/index.ts");
/******/ 	
/******/ })()
;
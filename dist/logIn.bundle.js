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

/***/ "./src/style/logIn.scss"
/*!******************************!*\
  !*** ./src/style/logIn.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/logIn.scss?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchForm: () => (/* binding */ fetchForm)\n/* harmony export */ });\nfunction fetchForm() {\n    return fetch(\"form.html\")\n        .then(res => res.text()) //then response in text form\n        .then(html => {\n        const divForm = document.getElementById(\"contacts\");\n        if (!divForm) {\n            //throw new Error(\"Form Element not found\");\n            console.log(\"Form Element not found\");\n        }\n        divForm.innerHTML = html;\n        return divForm;\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/form.ts?\n}");

/***/ },

/***/ "./src/js-ts/logIn.ts"
/*!****************************!*\
  !*** ./src/js-ts/logIn.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/menu.scss */ \"./src/style/menu.scss\");\n/* harmony import */ var _style_form_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/form.scss */ \"./src/style/form.scss\");\n/* harmony import */ var _style_logIn_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/logIn.scss */ \"./src/style/logIn.scss\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu */ \"./src/js-ts/menu.ts\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form */ \"./src/js-ts/form.ts\");\n/* harmony import */ var _logInSections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logInSections */ \"./src/js-ts/logInSections.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => __awaiter(void 0, void 0, void 0, function* () {\n    (0,_menu__WEBPACK_IMPORTED_MODULE_3__.setUpMenu)();\n    (0,_form__WEBPACK_IMPORTED_MODULE_4__.fetchForm)();\n    //dowload template in memory\n    yield (0,_logInSections__WEBPACK_IMPORTED_MODULE_5__.loadTemplates)();\n    (0,_logInSections__WEBPACK_IMPORTED_MODULE_5__.setUpNewSection)(\"newRegistration\", \"loginHTML\", \"registrationTemplate\"); //new registration\n}));\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/logIn.ts?\n}");

/***/ },

/***/ "./src/js-ts/logInSections.ts"
/*!************************************!*\
  !*** ./src/js-ts/logInSections.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadTemplates: () => (/* binding */ loadTemplates),\n/* harmony export */   setUpNewSection: () => (/* binding */ setUpNewSection),\n/* harmony export */   setUpNewUserRegistration: () => (/* binding */ setUpNewUserRegistration)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst templates = {};\n//cronology of templates \nfunction loadTemplates() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const response = yield fetch(\"logInSections.html\");\n        const html = yield response.text();\n        const parser = new DOMParser();\n        const doc = parser.parseFromString(html, \"text/html\");\n        const foundTemplates = doc.querySelectorAll(\"template\");\n        foundTemplates.forEach(template => {\n            templates[template.id] = template;\n        });\n    });\n}\n//cleaning\nfunction cleanSection(sectionId) {\n    const section = document.getElementById(sectionId);\n    if (!section) {\n        console.error(\"Section not found\");\n        return;\n    }\n    section.innerHTML = \"\";\n}\n//insert template in the page\nfunction InsertTemplate(sectionId, templateId) {\n    const section = document.getElementById(sectionId);\n    if (!section) {\n        console.error(\"section not found\");\n        return;\n    }\n    const template = templates[templateId];\n    if (!template) {\n        console.error(\"template not loaded\");\n        return;\n    }\n    cleanSection(sectionId);\n    const clone = document.importNode(template.content, true);\n    section.appendChild(clone);\n    //check for submit \n    if (templateId === \"registrationTemplate\") {\n        setUpNewSection(\"submitRegistration\", \"loginHTML\", \"newPasswordTemplate\");\n    }\n}\n//check event for registration \nfunction setUpNewSection(eventId, sectionId, templateId) {\n    const linkClicked = document.getElementById(eventId);\n    if (!linkClicked) {\n        console.error(\"Link not found\");\n        return;\n    }\n    linkClicked.addEventListener(\"click\", (event) => {\n        event.preventDefault();\n        InsertTemplate(sectionId, templateId);\n    });\n}\n//check event for registration setUpNewUserRegistration\nfunction setUpNewUserRegistration() {\n    const linkClicked = document.getElementById(\"newRegistration\");\n    if (!linkClicked) {\n        console.error(\"Link not found\");\n        return;\n    }\n    linkClicked.addEventListener(\"click\", (event) => {\n        event.preventDefault();\n        InsertTemplate(\"login\", \"registration\");\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/logInSections.ts?\n}");

/***/ },

/***/ "./src/js-ts/menu.ts"
/*!***************************!*\
  !*** ./src/js-ts/menu.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setUpMenu: () => (/* binding */ setUpMenu)\n/* harmony export */ });\nfunction fetchMenu() {\n    return fetch(\"menu.html\")\n        .then(res => res.text()) //then response in text form\n        .then(html => {\n        const divMenu = document.getElementById(\"menu\");\n        if (!divMenu) {\n            //throw new Error(\" Menu Element not found\");\n            console.log(\" Menu Element not found\");\n        }\n        divMenu.innerHTML = html;\n        return divMenu;\n    });\n}\n// Update hash links to point to index.html if on another page\nfunction changeLinkNavigation(divMenu) {\n    const currentPage = window.location.pathname.split(\"/\").pop() || \"index.html\";\n    //const currentPage = window.location.pathname.split(\"/\").pop();\n    if (!divMenu) {\n        throw new Error(\"Element not founded\");\n    }\n    const links = divMenu.querySelectorAll(\"a[data-page]\");\n    links.forEach(link => {\n        const hrefLink = link.getAttribute(\"data-page\");\n        if (hrefLink !== \"universal\") {\n            if (hrefLink == currentPage) {\n                if (link.classList.contains(\"active\")) {\n                    link.classList.replace(\"active\", \"disabled\");\n                    link.addEventListener(\"click\", (event) => {\n                        event.preventDefault(); // impedisce la navigazione\n                    });\n                }\n            }\n            else {\n                link.classList.replace(\"disabled\", \"active\");\n                // Rimuovi il listener che bloccava il click\n                const handler = (event) => event.preventDefault();\n                link.removeEventListener(\"click\", handler);\n            }\n        }\n    });\n    return currentPage;\n}\nfunction checkMenuSections() {\n    const swimSuitBtn = document.querySelector('a[href=\"#swim_suit\"]');\n    const accessoriesBtn = document.querySelector('a[href=\"#accessories\"]');\n    const swimSuit = document.getElementById(\"swim_suit\");\n    const accessories = document.getElementById(\"accessories\");\n    if (!swimSuit || !accessories || !swimSuitBtn || !accessoriesBtn)\n        return;\n    // Funzione generica per aprire/chiudere\n    function toggleMenu(menuToOpen, menuToClose) {\n        const isOpen = menuToOpen.dataset.menu === \"open\";\n        menuToOpen.dataset.menu = isOpen ? \"close\" : \"open\";\n        menuToClose.dataset.menu = \"close\";\n    }\n    // Funzioni specifiche\n    function toggleSwimSuit() { toggleMenu(swimSuit, accessories); }\n    function toggleAccessories() { toggleMenu(accessories, swimSuit); }\n    // Click sui bottoni\n    swimSuitBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleSwimSuit(); });\n    accessoriesBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleAccessories(); });\n    closeClickOutside(swimSuit, swimSuitBtn, accessories, accessoriesBtn);\n}\nfunction closeClickOutside(swimSuit, swimSuitBtn, accessories, accessoriesBtn) {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target;\n        if (!swimSuit.contains(target) &&\n            !swimSuitBtn.contains(target) &&\n            !accessories.contains(target) &&\n            !accessoriesBtn.contains(target)) {\n            swimSuit.dataset.menu = \"close\";\n            accessories.dataset.menu = \"close\";\n        }\n    });\n}\n// Final function to export \nfunction setUpMenu() {\n    fetchMenu()\n        .then((divMenu) => {\n        changeLinkNavigation(divMenu); // upload state link \n        checkMenuSections();\n    })\n        .catch(error => {\n        throw new Error(\"Error upload state menu\");\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/menu.ts?\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js-ts/logIn.ts");
/******/ 	
/******/ })()
;
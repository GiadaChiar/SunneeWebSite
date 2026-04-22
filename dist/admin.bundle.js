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

/***/ "./src/style/admin.scss"
/*!******************************!*\
  !*** ./src/style/admin.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/admin.scss?\n}");

/***/ },

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

/***/ "./src/style/poUp.scss"
/*!*****************************!*\
  !*** ./src/style/poUp.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sunneewebsite/./src/style/poUp.scss?\n}");

/***/ },

/***/ "./src/js-ts/admin.ts"
/*!****************************!*\
  !*** ./src/js-ts/admin.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/admin.scss */ \"./src/style/admin.scss\");\n/* harmony import */ var _style_poUp_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/poUp.scss */ \"./src/style/poUp.scss\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates */ \"./src/js-ts/templates.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./events */ \"./src/js-ts/events.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => __awaiter(void 0, void 0, void 0, function* () {\n    yield (0,_templates__WEBPACK_IMPORTED_MODULE_2__.loadTemplates)();\n    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.disableDropdown)(\"dropdownButtonGender\", true);\n    (0,_events__WEBPACK_IMPORTED_MODULE_4__.initTypeDropdown)();\n    (0,_events__WEBPACK_IMPORTED_MODULE_4__.initGlobalClickListener)();\n    (0,_events__WEBPACK_IMPORTED_MODULE_4__.handleFormSubmit)();\n    /*\n    initSearchSection();*/\n}));\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/admin.ts?\n}");

/***/ },

/***/ "./src/js-ts/dom.ts"
/*!**************************!*\
  !*** ./src/js-ts/dom.ts ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCloseButton: () => (/* binding */ addCloseButton),\n/* harmony export */   changeTextContent: () => (/* binding */ changeTextContent),\n/* harmony export */   cleanSection: () => (/* binding */ cleanSection),\n/* harmony export */   disableDropdown: () => (/* binding */ disableDropdown),\n/* harmony export */   genderMenu: () => (/* binding */ genderMenu),\n/* harmony export */   getDropdownValue: () => (/* binding */ getDropdownValue),\n/* harmony export */   initGenericDropdown: () => (/* binding */ initGenericDropdown),\n/* harmony export */   showHidden: () => (/* binding */ showHidden),\n/* harmony export */   showPopUp: () => (/* binding */ showPopUp)\n/* harmony export */ });\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates */ \"./src/js-ts/templates.ts\");\n\n//--------------------------------------------------STANDARD FUNCTIONs -----------------------------------------------------------------\n//clean element to HTML pages\nfunction cleanSection(sectionId) {\n    const section = document.getElementById(sectionId);\n    if (!section) {\n        return;\n    }\n    section.innerHTML = \"\";\n}\n//Function change text content\nfunction changeTextContent(elementId, text) {\n    const element = document.getElementById(elementId);\n    if (element)\n        element.textContent = text;\n}\n//show information popUp\nfunction showPopUp(title, message) {\n    const existingPopUp = document.getElementById(\"custom-popup\");\n    if (existingPopUp) {\n        cleanSection(\"PopUpHtml\");\n    }\n    (0,_templates__WEBPACK_IMPORTED_MODULE_0__.insertTemplate)(\"PopUpHtml\", \"popUp\");\n    changeTextContent(\"popUpTitle\", title);\n    changeTextContent(\"popUpMessage\", message);\n    addCloseButton(\"custom-popup\");\n}\nfunction addCloseButton(containerId) {\n    const container = document.getElementById(containerId);\n    if (!container)\n        return;\n    const closeBtn = document.createElement(\"button\");\n    closeBtn.classList.add(\"btn-close\");\n    closeBtn.type = \"button\";\n    closeBtn.addEventListener(\"click\", () => {\n        container.remove();\n    });\n    container.style.position = \"relative\";\n    container.appendChild(closeBtn);\n}\n//-------------------------------ADMIN SECTION----------------------------------------------------------\n//disable dropdown in the filter to add or change products\nfunction disableDropdown(dropdownId, bool) {\n    const dropdownButton = document.getElementById(dropdownId);\n    if (dropdownButton) {\n        dropdownButton.disabled = bool; // disable\n    }\n}\n//filter swim-suit subcategory\nfunction showHidden(subMenuId) {\n    const subMenu = document.getElementById(subMenuId);\n    if (subMenu) {\n        if (subMenu.dataset.show === \"none\") {\n            subMenu.dataset.show = \"see\";\n        }\n        else {\n            subMenu.dataset.show = \"none\";\n        }\n    }\n}\n// set dropdown in relation to type\nfunction genderMenu(valueDropdown) {\n    const genderButton = document.getElementById(\"dropdownButtonGender\");\n    if (!genderButton)\n        return;\n    if (valueDropdown === \"sarong\") {\n        disableDropdown(\"dropdownButtonGender\", true);\n        changeTextContent(\"dropdownButtonGender\", \"donna\");\n        genderButton.setAttribute(\"data-value\", \"woman\");\n        return;\n    }\n    if (valueDropdown === \"cap\") {\n        disableDropdown(\"dropdownButtonGender\", true);\n        changeTextContent(\"dropdownButtonGender\", \"unisex\");\n        genderButton.setAttribute(\"data-value\", \"unisex\");\n        return;\n    }\n    disableDropdown(\"dropdownButtonGender\", false);\n    changeTextContent(\"dropdownButtonGender\", \"Genere\");\n}\n//set text and value in dropdowns != Type\nfunction initGenericDropdown(target, dropdownId, buttonId) {\n    var _a;\n    if (!target.classList.contains(\"dropdown-item\"))\n        return;\n    if (!target.closest(`#${dropdownId}`))\n        return;\n    const name = target.getAttribute(\"name\") || \"\";\n    const value = target.getAttribute(\"value\") || \"\";\n    // change button text\n    changeTextContent(buttonId, name);\n    //save value in dom like type \n    (_a = document\n        .getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.setAttribute(\"data-value\", value);\n    // in base type you have a specific gender or a selection\n    if (dropdownId === \"typeDropdown\") {\n        genderMenu(value);\n        return;\n    }\n}\n;\n//----------------------------------UNITOOOOOOOOOOOOOOOOOOOO-----------------------------\n/*\n//get value in Type dropdown\nexport function getTypeValue(): string | null {\n    return document\n        .getElementById(\"dropdownButtonType\")\n        ?.getAttribute(\"data-value\") || null;\n}\n*/\n//get values from other dropdowns\nfunction getDropdownValue(buttonId) {\n    var _a;\n    return ((_a = document\n        .getElementById(buttonId)) === null || _a === void 0 ? void 0 : _a.getAttribute(\"data-value\")) || null;\n}\n///----------------------------END UNITPOOOOOOOOOOOOOOOOOOOOOOOOO-----------------------+\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/dom.ts?\n}");

/***/ },

/***/ "./src/js-ts/events.ts"
/*!*****************************!*\
  !*** ./src/js-ts/events.ts ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleFormSubmit: () => (/* binding */ handleFormSubmit),\n/* harmony export */   initGlobalClickListener: () => (/* binding */ initGlobalClickListener),\n/* harmony export */   initTypeDropdown: () => (/* binding */ initTypeDropdown),\n/* harmony export */   logInListenerClick: () => (/* binding */ logInListenerClick),\n/* harmony export */   submitLogIn: () => (/* binding */ submitLogIn)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/js-ts/utils.ts\");\n/* harmony import */ var _logIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logIn */ \"./src/js-ts/logIn.ts\");\n/* harmony import */ var _userServices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userServices */ \"./src/js-ts/userServices.ts\");\n/* harmony import */ var _productService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./productService */ \"./src/js-ts/productService.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\n\n//--------START LOGIN PART -------------------------------------------\nfunction logInListenerClick() {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target;\n        const linkReservateArea = target.closest(\"#buttonLinkHTML\");\n        if (linkReservateArea) {\n            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.setAdminLogin)(true);\n            (0,_logIn__WEBPACK_IMPORTED_MODULE_2__.setReservatePage)();\n        }\n    });\n}\n//if I click to button access I have to undestand if it is a loggerUser or loggerAdmin section\nfunction submitLogIn() {\n    const loginForm = document.getElementById(\"loginFormStandard\");\n    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener(\"submit\", (e) => {\n        e.preventDefault();\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.getAdminLogin)()) {\n            console.log(\"E' ADMIN\");\n            (0,_userServices__WEBPACK_IMPORTED_MODULE_3__.checkReservedLogin)(); // admin\n        }\n        else {\n            console.log(\"E' UN USER\");\n            // checkUserLogin(); // standard\n        }\n    }, { once: true });\n}\n//------------END LOGIN PART --------------------------------\n//------------START ADMIN PART ----------------------------------------------\nfunction initTypeDropdown() {\n    const buttonType = document.getElementById(\"typeDropdown\");\n    buttonType === null || buttonType === void 0 ? void 0 : buttonType.addEventListener(\"click\", (event) => {\n        var _a, _b;\n        const target = event.target;\n        if (target instanceof HTMLElement && target.classList.contains(\"dropdown-item\")) {\n            const nameDropdown = target.getAttribute(\"name\") || \"\";\n            let valueDropdown = target.getAttribute(\"value\") || \"\";\n            if (valueDropdown == \"swimSuit\") {\n                event.preventDefault(); //still open\n                event.stopPropagation();\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showHidden)(\"submenuType\");\n                return;\n            }\n            if (target.closest(\"#submenuType\")) {\n                const nameUnderMenu = target.getAttribute(\"name\") || \"\";\n                let valueUnderMenu = target.getAttribute(\"data-value\") || \"\";\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.changeTextContent)(\"dropdownButtonType\", nameUnderMenu);\n                (_a = document.getElementById(\"dropdownButtonType\")) === null || _a === void 0 ? void 0 : _a.setAttribute(\"data-value\", valueUnderMenu);\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.genderMenu)(valueUnderMenu);\n                return;\n            }\n            if (valueDropdown !== \"swimSuit\" && valueDropdown !== null && nameDropdown !== null) {\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.changeTextContent)(\"dropdownButtonType\", nameDropdown);\n                (_b = document.getElementById(\"dropdownButtonType\")) === null || _b === void 0 ? void 0 : _b.setAttribute(\"data-value\", valueDropdown);\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.genderMenu)(valueDropdown);\n                return;\n            }\n        }\n    });\n}\n//Listeren \nfunction initGlobalClickListener() {\n    document.addEventListener(\"click\", (event) => {\n        const target = event.target;\n        if (!target)\n            return;\n        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.initGenericDropdown)(target, \"sizeDropdown\", \"dropdownButtonSize\");\n        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.initGenericDropdown)(target, \"colorDropdown\", \"dropdownButtonColor\");\n        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.initGenericDropdown)(target, \"stateDropdown\", \"dropdownButtonState\");\n        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.initGenericDropdown)(target, \"genderDropdown\", \"dropdownButtonGender\");\n    });\n}\n//send information/save change \nfunction handleFormSubmit() {\n    const form = document.getElementById(\"submitSave\");\n    form === null || form === void 0 ? void 0 : form.addEventListener(\"click\", (event) => __awaiter(this, void 0, void 0, function* () {\n        event.preventDefault();\n        const productData = (0,_productService__WEBPACK_IMPORTED_MODULE_4__.buildProductFromForm)();\n        if (!productData) {\n            (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showPopUp)(\"Errore\", \"Compila tutti i campi\");\n            return;\n        }\n        ///TOGLIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII---------------------------------------\\\n        //await insertProduct(productData); \n    }));\n}\n//------------END ADMIN PART -------------------------------------------\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/events.ts?\n}");

/***/ },

/***/ "./src/js-ts/form.ts"
/*!***************************!*\
  !*** ./src/js-ts/form.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchForm: () => (/* binding */ fetchForm)\n/* harmony export */ });\nfunction fetchForm() {\n    return fetch(\"form.html\")\n        .then(res => res.text())\n        .then(html => {\n        const divForm = document.getElementById(\"contacts\");\n        if (!divForm)\n            return;\n        divForm.innerHTML = html;\n        return divForm;\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/form.ts?\n}");

/***/ },

/***/ "./src/js-ts/logIn.ts"
/*!****************************!*\
  !*** ./src/js-ts/logIn.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setReservatePage: () => (/* binding */ setReservatePage)\n/* harmony export */ });\n/* harmony import */ var _style_menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/menu.scss */ \"./src/style/menu.scss\");\n/* harmony import */ var _style_form_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/form.scss */ \"./src/style/form.scss\");\n/* harmony import */ var _style_logIn_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/logIn.scss */ \"./src/style/logIn.scss\");\n/* harmony import */ var _style_poUp_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/poUp.scss */ \"./src/style/poUp.scss\");\n/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu */ \"./src/js-ts/menu.ts\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form */ \"./src/js-ts/form.ts\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates */ \"./src/js-ts/templates.ts\");\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./events */ \"./src/js-ts/events.ts\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n//NON IMPORTATO getTypeandDataFilterMenu NON PENSO SERVA\n\n\n\n//import{ setReservateLogIn} from \"./events\"\n\n\n\n//setUp Reservation Access\nfunction setReservatePage() {\n    (0,_dom__WEBPACK_IMPORTED_MODULE_8__.cleanSection)(\"buttonLinkHTML\");\n    (0,_dom__WEBPACK_IMPORTED_MODULE_8__.cleanSection)(\"newRegistration\");\n    (0,_dom__WEBPACK_IMPORTED_MODULE_8__.cleanSection)(\"forgotPassword\");\n    (0,_dom__WEBPACK_IMPORTED_MODULE_8__.changeTextContent)(\"titleLogIn\", \"Accesso Riservato:\");\n    (0,_events__WEBPACK_IMPORTED_MODULE_7__.submitLogIn)();\n}\nconsole.log(\"PAGEEE LOGFIN\");\ndocument.addEventListener(\"DOMContentLoaded\", () => __awaiter(void 0, void 0, void 0, function* () {\n    //dowload template in memory\n    yield (0,_templates__WEBPACK_IMPORTED_MODULE_6__.loadTemplates)();\n    (0,_events__WEBPACK_IMPORTED_MODULE_7__.logInListenerClick)();\n    /*setUpNewSection(\"newRegistration\",\"loginHTML\",\"registrationTemplate\");//new registration\n    setUpMenu();\n    fetchForm();\n    setReservateLogIn();\n    preventSubmitLogIn();\n    getTypeandDataFilterMenu();\n    showUsers();\n    showUsersAllUsers()*/\n}));\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/logIn.ts?\n}");

/***/ },

/***/ "./src/js-ts/menu.ts"
/*!***************************!*\
  !*** ./src/js-ts/menu.ts ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getTypeandDataFilterMenu: () => (/* binding */ getTypeandDataFilterMenu),\n/* harmony export */   setUpMenu: () => (/* binding */ setUpMenu)\n/* harmony export */ });\nfunction fetchMenu() {\n    return fetch(\"menu.html\")\n        .then(res => res.text()) //then response in text form\n        .then(html => {\n        const divMenu = document.getElementById(\"menu\");\n        if (!divMenu)\n            return;\n        divMenu.innerHTML = html;\n        return divMenu;\n    });\n}\n// Update hash links to point to index.html if on another page\nfunction changeLinkNavigation(divMenu) {\n    const currentPage = window.location.pathname.split(\"/\").pop() || \"index.html\";\n    if (!divMenu) {\n        throw new Error(\"Element not founded\");\n    }\n    const links = divMenu.querySelectorAll(\"a[data-page]\");\n    links.forEach(link => {\n        const hrefLink = link.getAttribute(\"data-page\");\n        if (hrefLink !== \"universal\") {\n            if (hrefLink == currentPage) {\n                if (link.classList.contains(\"active\")) {\n                    link.classList.replace(\"active\", \"disabled\");\n                }\n            }\n            else {\n                link.classList.replace(\"disabled\", \"active\");\n                // remove listener to prevent click\n                const handler = (event) => event.preventDefault();\n                link.removeEventListener(\"click\", handler);\n            }\n        }\n    });\n    return currentPage;\n}\n//------------------OLD CODE ---------------------//\n/*\nfunction checkMenuSections() {\n    const swimSuitBtn = document.querySelector('a[href=\"#swim_suit\"]') as HTMLElement;\n    const accessoriesBtn = document.querySelector('a[href=\"#accessories\"]') as HTMLElement;\n\n    const swimSuit = document.getElementById(\"swim_suit\") as HTMLElement;\n    const accessories = document.getElementById(\"accessories\") as HTMLElement;\n\n    if (!swimSuit || !accessories || !swimSuitBtn || !accessoriesBtn) return;\n\n    // generic function open/close\n    function toggleMenu(menuToOpen: HTMLElement, menuToClose: HTMLElement) {\n        const isOpen = menuToOpen.dataset.menu === \"open\";\n        menuToOpen.dataset.menu = isOpen ? \"close\" : \"open\";\n        menuToClose.dataset.menu = \"close\";\n    }\n\n\n    function toggleSwimSuit() { toggleMenu(swimSuit, accessories); }\n    function toggleAccessories() { toggleMenu(accessories, swimSuit); }\n\n    // buttons clicks\n    swimSuitBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleSwimSuit(); });\n    accessoriesBtn.addEventListener(\"click\", (e) => { e.preventDefault(); toggleAccessories(); });\n\n    closeClickOutside(swimSuit, swimSuitBtn, accessories, accessoriesBtn)\n\n}\n\n\n\n\n\n//global event listener to get data-type and value\nexport function getTypeandDataFilterMenu() {\n    document.addEventListener(\"click\", (event) => {\n        const target = event.target as HTMLElement;\n\n        const dropdownItem = target.closest(\"a[data-gender]\") as HTMLAnchorElement;\n        if (!dropdownItem) return;\n\n        event.preventDefault();\n\n        const type = dropdownItem.dataset.type;\n        const gender = dropdownItem.dataset.gender;\n\n        //send data\n        window.location.href = `shop.html?type=${type}&gender=${gender}`;\n\n    });\n}\n\n\nfunction closeClickOutside(swimSuit: HTMLElement, swimSuitBtn: HTMLElement, accessories: HTMLElement, accessoriesBtn: HTMLElement) {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target as HTMLElement;\n        if (\n            !swimSuit.contains(target) &&\n            !swimSuitBtn.contains(target) &&\n            !accessories.contains(target) &&\n            !accessoriesBtn.contains(target)\n        ) {\n            swimSuit.dataset.menu = \"close\";\n            accessories.dataset.menu = \"close\";\n        }\n    });\n}\n\n\n// Final function to export\nexport function setUpMenu() {\n    fetchMenu()\n        .then((divMenu) => {\n            changeLinkNavigation(divMenu as HTMLElement); // upload state link\n            checkMenuSections();\n            getTypeandDataFilterMenu(); inside checkClick\n        })\n        .catch(error => {\n            console.log(\"Error upload state menu\");\n        });\n}\n\n\n*/\n//--------------------NEW CODE-------------------------------//\n// generic function open/close\nfunction toggleMenu(menuToOpen, menuToClose) {\n    const isOpen = menuToOpen.dataset.menu === \"open\";\n    menuToOpen.dataset.menu = isOpen ? \"close\" : \"open\";\n    menuToClose.dataset.menu = \"close\";\n}\n//global event listener to get data-type and value\nfunction getTypeandDataFilterMenu(dropdownItem) {\n    const type = dropdownItem.dataset.type;\n    const gender = dropdownItem.dataset.gender;\n    window.location.href = `shop.html?type=${type}&gender=${gender}`;\n}\nfunction checkClickMenu() {\n    document.addEventListener(\"click\", (e) => {\n        const target = e.target;\n        const swimSuitBtn = target.closest('a[href=\"#swim_suit\"]');\n        const accessoriesBtn = target.closest('a[href=\"#accessories\"]');\n        const swimSuit = document.getElementById(\"swim_suit\");\n        const accessories = document.getElementById(\"accessories\");\n        const dropdownItem = target.closest(\"a[data-gender]\");\n        if (swimSuitBtn) {\n            e.preventDefault();\n            toggleMenu(swimSuit, accessories);\n            return;\n        }\n        else if (accessoriesBtn) {\n            e.preventDefault();\n            toggleMenu(accessories, swimSuit);\n            return;\n        }\n        else if (dropdownItem) {\n            e.preventDefault();\n            getTypeandDataFilterMenu(dropdownItem);\n        }\n        else {\n            swimSuit.dataset.menu = \"close\";\n            accessories.dataset.menu = \"close\";\n        }\n    });\n}\n// Final function to export \nfunction setUpMenu() {\n    fetchMenu()\n        .then((divMenu) => {\n        changeLinkNavigation(divMenu); // upload state link \n        checkClickMenu();\n    })\n        .catch(error => {\n        console.log(\"Error upload state menu\");\n    });\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/menu.ts?\n}");

/***/ },

/***/ "./src/js-ts/productService.ts"
/*!*************************************!*\
  !*** ./src/js-ts/productService.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildProductFromForm: () => (/* binding */ buildProductFromForm)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validations */ \"./src/js-ts/validations.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/js-ts/utils.ts\");\n\n\n\n//Service about products \n//--------------------START ADMIN SECTION -------------------------------------------------------------\n// BUILD PRODUCT\n// ----------------------\nfunction buildProductFromForm() {\n    //const type = getTypeValue();\n    const type = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getDropdownValue)(\"typeDropdown\");\n    if (!type)\n        return null;\n    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.genderMenu)(type);\n    const gender = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getDropdownValue)(\"dropdownButtonGender\");\n    const size = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getDropdownValue)(\"dropdownButtonSize\");\n    const color = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getDropdownValue)(\"dropdownButtonColor\");\n    const state = (0,_dom__WEBPACK_IMPORTED_MODULE_0__.getDropdownValue)(\"dropdownButtonState\");\n    const quantity = (0,_validations__WEBPACK_IMPORTED_MODULE_1__.checkInputQuantity)();\n    const prize = (0,_validations__WEBPACK_IMPORTED_MODULE_1__.checkPrizeInput)();\n    const description = (0,_validations__WEBPACK_IMPORTED_MODULE_1__.checkDescriptionInput)();\n    const image = (0,_validations__WEBPACK_IMPORTED_MODULE_1__.checkInputImage)();\n    if (!type || !size || !color || !gender ||\n        quantity === null || prize === null || !description || !image) {\n        return null;\n    }\n    alert(\"prodotto creatoooooo\");\n    return {\n        id: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.generateId)(),\n        type: type,\n        gender: gender,\n        prize,\n        image,\n        description,\n        variants: [\n            {\n                size: size,\n                color: color,\n                quantity,\n                state: state || (quantity > 0 ? \"available\" : \"unavailable\")\n            }\n        ]\n    };\n}\n//-------------------END ADMIN SECTION -----------------------------------------\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/productService.ts?\n}");

/***/ },

/***/ "./src/js-ts/templates.ts"
/*!********************************!*\
  !*** ./src/js-ts/templates.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   insertTemplate: () => (/* binding */ insertTemplate),\n/* harmony export */   loadTemplates: () => (/* binding */ loadTemplates)\n/* harmony export */ });\n//-----------STANDARD LOAD TEMPLATES--------------------------------------------\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n//loader templates to save them in memory\nconst templates = {};\nfunction loadTemplates() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const response = yield fetch(\"logInSections.html\");\n        const html = yield response.text();\n        const parser = new DOMParser();\n        const doc = parser.parseFromString(html, \"text/html\");\n        const foundTemplates = doc.querySelectorAll(\"template\");\n        foundTemplates.forEach(template => {\n            templates[template.id] = template;\n        });\n    });\n}\n//insert template in the page\nfunction insertTemplate(sectionId, templateId) {\n    const section = document.getElementById(sectionId);\n    const template = templates[templateId];\n    if (!section || !template) {\n        console.error(\"Section or template not found\");\n        return;\n    }\n    //make a copy by template and then replace it \n    const clone = template.content.cloneNode(true);\n    section.replaceChildren(clone);\n    //check for submit \n    if (templateId === \"registrationTemplate\") {\n        const form = document.getElementById(\"registration\");\n        //add listener forum only one time\n        if (form && !form.hasAttribute(\"data-listener\")) {\n            form.addEventListener(\"submit\", (e) => {\n                e.preventDefault();\n                //ATTIVALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO CON LOGIN NORMALE \n                //checkRegistration();\n            });\n            form.setAttribute(\"data-listener\", \"true\");\n        }\n    }\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/templates.ts?\n}");

/***/ },

/***/ "./src/js-ts/userInterfaces.ts"
/*!*************************************!*\
  !*** ./src/js-ts/userInterfaces.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reservedUsers: () => (/* binding */ reservedUsers)\n/* harmony export */ });\n//--------STATIC USERS ----------------------\n//login Admin\nconst reservedUsers = [\n    {\n        email: \"admin@site.com\",\n        password: \"admin123\"\n    },\n    {\n        email: \"manager@site.com\",\n        password: \"manager123\"\n    }\n];\n//------END STATIC USERS -----------------------\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/userInterfaces.ts?\n}");

/***/ },

/***/ "./src/js-ts/userServices.ts"
/*!***********************************!*\
  !*** ./src/js-ts/userServices.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkReservedLogin: () => (/* binding */ checkReservedLogin)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n/* harmony import */ var _userInterfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./userInterfaces */ \"./src/js-ts/userInterfaces.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/js-ts/utils.ts\");\n/* harmony import */ var _validations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./validations */ \"./src/js-ts/validations.ts\");\n\n\n\n\n//--------------LOGIN ADMIN -------------------------\n//autentification Admin\nfunction checkReservedLogin() {\n    let emailInput = document.getElementById(\"logInEmail\");\n    let passwordInput = document.getElementById(\"logInPassword\");\n    emailInput.textContent = \"\";\n    passwordInput.textContent = \"\";\n    const user = _userInterfaces__WEBPACK_IMPORTED_MODULE_1__.reservedUsers.find(u => u.email === emailInput.value && u.password === passwordInput.value);\n    if (!user) {\n        (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showPopUp)(\"Errore\", \"Accesso non autorizzato\");\n        return;\n    }\n    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.showPopUp)(\"Accesso consentito\", \"Benvenuto nell'area riservata\");\n    window.location.href = \"admin.html\";\n    emailInput.value = \"\";\n    passwordInput.value = \"\";\n    return;\n}\n// REGISTATION  NEW USER ------------------------------------------------\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/userServices.ts?\n}");

/***/ },

/***/ "./src/js-ts/utils.ts"
/*!****************************!*\
  !*** ./src/js-ts/utils.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateId: () => (/* binding */ generateId),\n/* harmony export */   getAdminLogin: () => (/* binding */ getAdminLogin),\n/* harmony export */   setAdminLogin: () => (/* binding */ setAdminLogin)\n/* harmony export */ });\n//generate id \nfunction generateId() {\n    const value = Math.random().toString(32).substring(2, 9);\n    return value;\n}\n//----------LOG IN SECTION--------------------------------------------------\n// global state page login to admin login and standard user\nlet isAdminLogin = false;\nfunction setAdminLogin(value) {\n    isAdminLogin = value;\n}\nfunction getAdminLogin() {\n    return isAdminLogin;\n}\n//---------------ADMIN SECTION--------------------------------------------------\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/utils.ts?\n}");

/***/ },

/***/ "./src/js-ts/validations.ts"
/*!**********************************!*\
  !*** ./src/js-ts/validations.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ValidationNewUser: () => (/* binding */ ValidationNewUser),\n/* harmony export */   checkDescriptionInput: () => (/* binding */ checkDescriptionInput),\n/* harmony export */   checkInputImage: () => (/* binding */ checkInputImage),\n/* harmony export */   checkInputQuantity: () => (/* binding */ checkInputQuantity),\n/* harmony export */   checkPrizeInput: () => (/* binding */ checkPrizeInput)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n\n//-----------------------LOGIN SECTION ------------------------------\n//check validation input new user\nfunction ValidationNewUser() {\n    const nameInput = document.getElementById(\"name\");\n    const surnameInput = document.getElementById(\"surname\");\n    const emailInput = document.getElementById(\"email\");\n    const paymentSelect = document.getElementById(\"preferPayment\");\n    //check not empty values\n    if (!nameInput.value || !surnameInput.value || !emailInput.value || !paymentSelect.value) {\n        return false;\n    }\n    //name and surname not number\n    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\\s'-]+$/;\n    if (!nameRegex.test(nameInput.value)) {\n        //showPopUp(\"Attenzione!\", \"Il nome non può contenere numeri o caratteri speciali\")\n        return false;\n    }\n    if (!nameRegex.test(surnameInput.value)) {\n        //showPopUp(\"Attenzione!\", \"Il cognome non può contenere numeri o caratteri speciali\")\n        return false;\n    }\n    //check email \n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(emailInput.value)) {\n        //showPopUp(\"Attenzione!\", \"Email non valida\")\n        return false;\n    }\n    return true;\n}\n//------------ADMIN SECTION -----------------------------------------\n//INPUT :\n//----check input -------------//\nfunction checkInputQuantity() {\n    const quantityInput = document.getElementById(\"quantityInput\");\n    let value = quantityInput.value.trim();\n    const num = parseInt(value, 10);\n    if (isNaN(num) || num < 0) {\n        quantityInput.value = \"\";\n        return null;\n    }\n    return num;\n}\nfunction checkPrizeInput() {\n    const prizeInput = document.getElementById(\"prizeInput\");\n    let value = prizeInput.value;\n    if (!value)\n        return null;\n    return Number(value);\n}\nfunction checkDescriptionInput() {\n    const descriptionInput = document.getElementById(\"descriptionInput\");\n    let value = descriptionInput.value;\n    if (!value)\n        return null;\n    return value;\n}\nfunction checkInputImage() {\n    const imageInput = document.getElementById(\"imageInput\");\n    let pathImage = imageInput.value;\n    let value = pathImage.replace(\"C:\\\\fakepath\\\\\", \"\");\n    return value;\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/validations.ts?\n}");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js-ts/admin.ts");
/******/ 	
/******/ })()
;
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

/***/ "./src/js-ts/admin.ts"
/*!****************************!*\
  !*** ./src/js-ts/admin.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_admin_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/admin.scss */ \"./src/style/admin.scss\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n\n\n/*\nexport function changeTextContent(elementId: string, text: string) {\n\n    const element = document.getElementById(elementId);\n    if (element)\n        element.textContent = text\n\n}\n*/\nfunction showHidden(subMenuId) {\n    const subMenu = document.getElementById(subMenuId);\n    if (subMenu) {\n        if (subMenu.dataset.show === \"none\") {\n            subMenu.dataset.show = \"see\";\n        }\n        else {\n            subMenu.dataset.show = \"none\";\n        }\n    }\n}\nfunction disableAnableDropdown(dropdownId, bool) {\n    const dropdownButton = document.getElementById(dropdownId);\n    if (dropdownButton) {\n        dropdownButton.disabled = bool; // disabilita\n    }\n}\nfunction genderMenu(valueDropdown) {\n    if (valueDropdown === \"sarong\" || valueDropdown === \"cap\" && valueDropdown !== null) {\n        disableAnableDropdown(\"dropdownButtonGender\", true);\n        if (valueDropdown === \"sarong\") {\n            (0,_dom__WEBPACK_IMPORTED_MODULE_1__.changeTextContent)(\"dropdownButtonGender\", \"donna\");\n        }\n        else {\n            (0,_dom__WEBPACK_IMPORTED_MODULE_1__.changeTextContent)(\"dropdownButtonGender\", \"unisex\");\n        }\n    }\n    else {\n        disableAnableDropdown(\"dropdownButtonGender\", false);\n    }\n}\n// Funzione che gestisce il valore selezionato\nfunction handleSelectedValueType(valueType, nameType) {\n    console.log(\"Valore selezionato:\", valueType);\n    console.log(\"Nome selezionato:\", nameType);\n    (0,_dom__WEBPACK_IMPORTED_MODULE_1__.changeTextContent)(\"dropdownButtonType\", nameType);\n    genderMenu(valueType);\n}\nfunction checkTypeDropdown() {\n    const buttonType = document.getElementById(\"typeDropdown\");\n    buttonType === null || buttonType === void 0 ? void 0 : buttonType.addEventListener(\"click\", (event) => {\n        const target = event.target;\n        if (target instanceof HTMLElement && target.classList.contains(\"dropdown-item\")) {\n            const nameDropdown = target.getAttribute(\"name\") || \"\";\n            let valueDropdown = target.getAttribute(\"value\") || \"\";\n            if (valueDropdown == \"swimSuit\") {\n                event.preventDefault(); //still open\n                event.stopPropagation();\n                showHidden(\"submenuType\");\n            }\n            if (target.closest(\"#submenuType\")) {\n                const nameUnderMenu = target.getAttribute(\"name\") || \"\";\n                console.log(\"SOTTOMENU\", nameUnderMenu);\n                //changeTextContent(\"dropdownButtonType\", nameUnderMenu)\n                const valueUnderMenu = target.getAttribute(\"data-value\") || \"\";\n                handleSelectedValueType(valueUnderMenu, nameUnderMenu);\n            }\n            if (valueDropdown !== \"swimSuit\" && valueDropdown !== null && nameDropdown !== null) {\n                handleSelectedValueType(valueDropdown, nameDropdown);\n            }\n        }\n    });\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    //desable dropdown gender\n    disableAnableDropdown(\"dropdownButtonGender\", true);\n    checkTypeDropdown();\n});\n/*\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n\n    //desable dropdown gender\n    disableAnableDropdown(\"dropdownButtonGender\",true)\n\n    const buttonType = document.getElementById(\"typeDropdown\");\n\n    buttonType?.addEventListener(\"click\", (event) => {\n        const target = event.target;\n        if (target instanceof HTMLElement && target.classList.contains(\"dropdown-item\")) {\n        \n            const nameDropdown = target.getAttribute(\"name\")\n            let valueDropdown = target.getAttribute(\"value\")\n            \n\n            if (valueDropdown == \"swimSuit\") {\n                event.preventDefault();//still open\n                event.stopPropagation();\n                showHidden(\"submenuType\");\n            }\n\n            if (target.closest(\"#submenuType\")){\n                const nameUnderMenu = target.getAttribute(\"name\")\n                console.log(\"SOTTOMENU\", nameUnderMenu)\n\n                if(nameUnderMenu){\n                    changeTextContent(\"dropdownButtonType\", nameUnderMenu)\n                    const valueUnderMenu= target.getAttribute(\"data-value\")\n                    if(valueUnderMenu){\n                        console.log(valueUnderMenu)\n                        valueDropdown = valueUnderMenu\n                        return valueDropdown\n                    }\n                }\n                \n            }\n\n            if (valueDropdown !== \"swimSuit\" && valueDropdown !== null && nameDropdown !== null) {\n                changeTextContent(\"dropdownButtonType\", nameDropdown)\n                console.log(valueDropdown)\n                return valueDropdown\n            }\n        }\n        \n    })\n\n});\n\n*/\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/admin.ts?\n}");

/***/ },

/***/ "./src/js-ts/dom.ts"
/*!**************************!*\
  !*** ./src/js-ts/dom.ts ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ValidationNewUser: () => (/* binding */ ValidationNewUser),\n/* harmony export */   changeTextContent: () => (/* binding */ changeTextContent),\n/* harmony export */   checkPassword: () => (/* binding */ checkPassword),\n/* harmony export */   checkRegistration: () => (/* binding */ checkRegistration),\n/* harmony export */   checkUserLogin: () => (/* binding */ checkUserLogin),\n/* harmony export */   cleanOldUsers: () => (/* binding */ cleanOldUsers),\n/* harmony export */   cleanSection: () => (/* binding */ cleanSection),\n/* harmony export */   isAdminLogin: () => (/* binding */ isAdminLogin),\n/* harmony export */   setAdminLogin: () => (/* binding */ setAdminLogin),\n/* harmony export */   showUsers: () => (/* binding */ showUsers),\n/* harmony export */   submitLogIn: () => (/* binding */ submitLogIn)\n/* harmony export */ });\n/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces */ \"./src/js-ts/interfaces.ts\");\n/* harmony import */ var _templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates */ \"./src/js-ts/templates.ts\");\n\n\nlet isAdminLogin = false;\nfunction setAdminLogin(value) {\n    isAdminLogin = value;\n}\n//clean element to HTML pages\nfunction cleanSection(sectionId) {\n    const section = document.getElementById(sectionId);\n    if (!section) {\n        console.error(\"Section not found\");\n        return;\n    }\n    section.innerHTML = \"\";\n}\n//Function change text content\nfunction changeTextContent(elementId, text) {\n    const element = document.getElementById(elementId);\n    if (element)\n        element.textContent = text;\n}\n//function pop-up\nfunction showPopUp(title, message) {\n    const existingPopUp = document.getElementById(\"custom-popup\");\n    if (existingPopUp) {\n        cleanSection(\"PopUpHtml\");\n    }\n    (0,_templates__WEBPACK_IMPORTED_MODULE_1__.insertTemplate)(\"PopUpHtml\", \"popUp\");\n    changeTextContent(\"popUpTitle\", title);\n    changeTextContent(\"popUpMessage\", message);\n    const closeButton = document.getElementById(\"closeButton\");\n    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener(\"click\", () => {\n        cleanSection(\"PopUpHtml\");\n    });\n}\n//REGISTRATION NEW USER \n//function validation input forum ecc..\n//save new users\nfunction saveNewUser(newUser) {\n    const usersJson = localStorage.getItem(\"users\");\n    const users = usersJson ? JSON.parse(usersJson) : [];\n    const existingUser = users.find(u => u.email === newUser.email);\n    if (existingUser) {\n        showPopUp(\"Errore\", \"Questa email è già registrata, vai nel log in\");\n        return false;\n    }\n    users.push(newUser);\n    localStorage.setItem(\"users\", JSON.stringify(users));\n    return true;\n}\nfunction ValidationNewUser() {\n    const nameInput = document.getElementById(\"name\");\n    const surnameInput = document.getElementById(\"surname\");\n    const emailInput = document.getElementById(\"email\");\n    const paymentSelect = document.getElementById(\"preferPayment\");\n    //check not empty values\n    if (!nameInput.value || !surnameInput.value || !emailInput.value || !paymentSelect.value) {\n        return false;\n    }\n    //name and surname not number\n    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\\s'-]+$/;\n    if (!nameRegex.test(nameInput.value)) {\n        showPopUp(\"Attenzione!\", \"Il nome non può contenere numeri o caratteri speciali\");\n        return false;\n    }\n    if (!nameRegex.test(surnameInput.value)) {\n        showPopUp(\"Attenzione!\", \"Il cognome non può contenere numeri o caratteri speciali\");\n        return false;\n    }\n    //check email \n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!emailRegex.test(emailInput.value)) {\n        showPopUp(\"Attenzione!\", \"Email non valida\");\n        return false;\n    }\n    return true;\n}\nfunction ValidationPassword() {\n    const passwordInput = document.getElementById(\"password\");\n    const confirmInput = document.getElementById(\"confirmPassword\");\n    if (!passwordInput || !confirmInput)\n        return false;\n    const password = passwordInput.value.trim();\n    const confirm = confirmInput.value.trim();\n    if (password.length < 8) {\n        showPopUp(\"Attenzione!\", \"La password deve essere di almeno 8 caratteri\");\n        return false;\n    }\n    // almeno una lettera e un numero\n    const regex = /^(?=.*[A-Za-z])(?=.*\\d).+$/;\n    if (!regex.test(password)) {\n        showPopUp(\"Attenzione!\", \"La password deve contenere almeno una lettera e un numero\");\n        return false;\n    }\n    // conferma password\n    if (password !== confirm) {\n        showPopUp(\"Errore!\", \"Le password non corrispondono\");\n        return false;\n    }\n    return true;\n}\nfunction checkPassword(user) {\n    const isValid = ValidationPassword();\n    if (!isValid) {\n        showPopUp(\"Errore\", \"Le password errate e/o non corrispondono\");\n        return;\n    }\n    if (isValid) {\n        user.password = document.getElementById(\"password\").value;\n        // Prendi gli utenti registrati\n        const usersJson = localStorage.getItem(\"users\");\n        const users = usersJson ? JSON.parse(usersJson) : [];\n        // Trova l’utente da aggiornare\n        const existingPassword = users.find(u => u.password === user.password);\n        if (existingPassword) {\n            showPopUp(\"Errore\", \"Password non valida, riprova\");\n            return false;\n        }\n        const index = users.findIndex(u => u.email === user.email);\n        if (index !== -1) {\n            users[index] = user; // aggiorna l’utente con la password\n        }\n        // Salva di nuovo l’array\n        localStorage.setItem(\"users\", JSON.stringify(users));\n        showPopUp(\"Inserito\", \"La password è stata registrata\");\n        const closeButton = document.getElementById(\"closeButton\");\n        closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener(\"click\", () => {\n            // quando chiudi il popup torni alla pagina principale\n            window.location.href = \"logIn.html\";\n        }, { once: true }); // 'once: true' assicura che il listener si esegue solo una volta\n    }\n}\n//check registration befor click\nfunction checkRegistration() {\n    const submitButton = document.getElementById(\"submitRegistration\");\n    if (submitButton)\n        submitButton.disabled = true;\n    //check inserted data are valid\n    const isValid = ValidationNewUser();\n    if (!isValid) {\n        showPopUp(\"Errore\", \"Campi mancanti e/o inserimenti non validi\");\n        //if it is valid\n        if (submitButton)\n            submitButton.disabled = false;\n        return;\n    }\n    if (isValid) {\n        const newUser = {\n            name: document.getElementById(\"name\").value,\n            surname: document.getElementById(\"surname\").value,\n            email: document.getElementById(\"email\").value,\n            preferPayment: document.getElementById(\"preferPayment\").value\n        };\n        const saved = saveNewUser(newUser);\n        if (!saved) {\n            if (submitButton)\n                submitButton.disabled = false;\n            return; // email già esistente, fermiamo qui\n        }\n        //if it is valid\n        if (submitButton)\n            submitButton.disabled = false;\n        // salvo in localStorage\n        /*localStorage.setItem(\"user\", JSON.stringify(newUser))\n        console.log(\"Utente salvato:\", newUser)*/\n        (0,_templates__WEBPACK_IMPORTED_MODULE_1__.insertTemplate)(\"loginHTML\", \"newPasswordTemplate\");\n        //block submit page \n        const passwordForm = document.getElementById(\"passwordForm\");\n        passwordForm === null || passwordForm === void 0 ? void 0 : passwordForm.addEventListener(\"submit\", (e) => {\n            e.preventDefault(); // blocca il reload automatico\n            if (newUser)\n                checkPassword(newUser);\n        });\n    }\n}\n//END REGISTRATION NEW USER \n//START LOG IN \n//get the date about user \nfunction getRegisteredUsers() {\n    const usersJson = localStorage.getItem(\"users\");\n    return usersJson ? JSON.parse(usersJson) : [];\n}\n//check if it is user or admin autentification\nfunction submitLogIn() {\n    const loginForm = document.getElementById(\"loginFormStandard\");\n    loginForm === null || loginForm === void 0 ? void 0 : loginForm.addEventListener(\"submit\", (e) => {\n        e.preventDefault();\n        if (isAdminLogin) {\n            checkReservedLogin(); // admin\n        }\n        else {\n            checkUserLogin(); // normale\n        }\n    });\n}\n//autentification Admin\nfunction checkReservedLogin() {\n    const emailInput = document.getElementById(\"logInEmail\");\n    const passwordInput = document.getElementById(\"logInPassword\");\n    const user = _interfaces__WEBPACK_IMPORTED_MODULE_0__.reservedUsers.find(u => u.email === emailInput.value && u.password === passwordInput.value);\n    if (!user) {\n        showPopUp(\"Errore\", \"Accesso non autorizzato\");\n        return;\n    }\n    showPopUp(\"Accesso consentito\", \"Benvenuto nell'area riservata\");\n    const closeButton = document.getElementById(\"closeButton\");\n    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener(\"click\", () => {\n        sessionStorage.setItem(\"adminLogged\", \"true\");\n        window.location.href = \"admin.html\";\n    }, { once: true });\n}\n//autentification Users\nfunction checkUserLogin() {\n    const emailInput = document.getElementById(\"logInEmail\");\n    const passwordInput = document.getElementById(\"logInPassword\");\n    const users = getRegisteredUsers();\n    const registeredUser = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);\n    if (!registeredUser) {\n        showPopUp(\"Errore\", \"Nessun utente registrato\");\n        return;\n    }\n    // accesso ok\n    showPopUp(\"Benvenuto!\", `Ciao ${registeredUser.name}`);\n    const closeButton = document.getElementById(\"closeButton\");\n    closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener(\"click\", () => {\n        // Vai alla pagina principale o home dopo login\n        window.location.href = \"index.html\";\n    }, { once: true });\n    // qui puoi fare redirect, ad esempio:\n    // window.location.href = \"home.html\";\n}\nfunction showUsers() {\n    const usersJson = localStorage.getItem(\"users\");\n    console.log(usersJson);\n}\nfunction cleanOldUsers() {\n    const usersJson = localStorage.getItem(\"users\");\n    if (!usersJson)\n        return; // niente da pulire\n    const users = JSON.parse(usersJson);\n    // filtra solo gli utenti che hanno una password definita\n    const filteredUsers = users.filter(user => user.password && user.password.trim() !== \"\");\n    // salva di nuovo\n    localStorage.setItem(\"users\", JSON.stringify(filteredUsers));\n    console.log(\"Utenti rimasti dopo la pulizia:\", filteredUsers);\n}\n//check password and user reservate area\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/dom.ts?\n}");

/***/ },

/***/ "./src/js-ts/interfaces.ts"
/*!*********************************!*\
  !*** ./src/js-ts/interfaces.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reservedUsers: () => (/* binding */ reservedUsers)\n/* harmony export */ });\n// I want to create an Interface for products standard\nconst products = [\n    { type: \"swim-suit\", subType: \"RELAX\", gender: \"WOMAN\", id: \"001\", size: \"M\", color: \"white\", state: \"available\", image: \".\\style\\img\\bikini_bianco.jpg\", quantity: 5 },\n];\nconst reservedUsers = [\n    {\n        email: \"admin@site.com\",\n        password: \"admin123\"\n    },\n    {\n        email: \"manager@site.com\",\n        password: \"manager123\"\n    }\n];\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/interfaces.ts?\n}");

/***/ },

/***/ "./src/js-ts/templates.ts"
/*!********************************!*\
  !*** ./src/js-ts/templates.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   insertTemplate: () => (/* binding */ insertTemplate),\n/* harmony export */   loadTemplates: () => (/* binding */ loadTemplates)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/js-ts/dom.ts\");\n//templates functions\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n//loader templates to save them in memory\nconst templates = {};\nfunction loadTemplates() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const response = yield fetch(\"logInSections.html\");\n        const html = yield response.text();\n        const parser = new DOMParser();\n        const doc = parser.parseFromString(html, \"text/html\");\n        const foundTemplates = doc.querySelectorAll(\"template\");\n        foundTemplates.forEach(template => {\n            templates[template.id] = template;\n        });\n    });\n}\n//insert template in the page\nfunction insertTemplate(sectionId, templateId) {\n    const section = document.getElementById(sectionId);\n    const template = templates[templateId];\n    if (!section || !template) {\n        console.error(\"Section or template not found\");\n        return;\n    }\n    //Not use clean it is better use a clonation \n    //make a copy by template and then replace it \n    const clone = template.content.cloneNode(true);\n    section.replaceChildren(clone);\n    //check for submit \n    if (templateId === \"registrationTemplate\") {\n        const form = document.getElementById(\"registration\");\n        //add listener forum only one time\n        //if existing and if is not an attribute data-listener add else not\n        //because I don't want add extra eventListener\n        if (form && !form.hasAttribute(\"data-listener\")) {\n            form.addEventListener(\"submit\", (e) => {\n                e.preventDefault();\n                (0,_dom__WEBPACK_IMPORTED_MODULE_0__.checkRegistration)();\n            });\n            form.setAttribute(\"data-listener\", \"true\");\n        }\n    }\n}\n\n\n//# sourceURL=webpack://sunneewebsite/./src/js-ts/templates.ts?\n}");

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
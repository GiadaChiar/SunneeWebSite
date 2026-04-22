
import { showPopUp } from "./dom"
import { reservedUsers } from "./userInterfaces";
import type { RegisterForm } from "./userInterfaces";
import { generateId } from './utils';
import { ValidationNewUser } from "./validations"


//--------------LOGIN ADMIN -------------------------
//autentification Admin
export function checkReservedLogin() {

    let emailInput = document.getElementById("logInEmail") as HTMLInputElement;
    let passwordInput = document.getElementById("logInPassword") as HTMLInputElement;
    emailInput.textContent = "";
    passwordInput.textContent = "";

    const user = reservedUsers.find(
        u => u.email === emailInput.value && u.password === passwordInput.value
    );

    if (!user) {
        showPopUp("Errore", "Accesso non autorizzato");
        return;
    }

    showPopUp("Accesso consentito", "Benvenuto nell'area riservata");
    window.location.href = "admin.html";
    emailInput.value = "";
    passwordInput.value = "";
    return;

}


// REGISTATION  NEW USER ------------------------------------------------










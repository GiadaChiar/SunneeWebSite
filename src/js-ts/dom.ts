//dom functions
import type { RegisterForm } from "./interfaces"; //add type bacause type it isn't in js is typescript
import { reservedUsers } from "./interfaces";
import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events"
export let isAdminLogin = false;

export function setAdminLogin(value: boolean) {
    isAdminLogin = value;
}

//clean element to HTML pages
export function cleanSection(sectionId: string) {

    const section = document.getElementById(sectionId);

    if (!section) {
        console.error("Section not found");
        return;
    }
    section.innerHTML = "";
}


//Function change text content

export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text

}


//function pop-up
export function showPopUp(title: string, message: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUp");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);

    const closeButton = document.getElementById("closeButton");

    closeButton?.addEventListener("click", () => {
        cleanSection("PopUpHtml");
    });
}


export function showPopUpSelection(title: string, message: string, checkright:string, checkleft:string ) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUpSelection");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);
    changeTextContent("popUCheckright", checkright);
    changeTextContent("popUCheckleft", checkleft);
    handleCheckBoxtPoPUp();

    const closeButton = document.getElementById("closeButton");

    closeButton?.addEventListener("click", () => {
        cleanSection("PopUpHtml");
    });
}









//REGISTRATION NEW USER 
//function validation input forum ecc..

//save new users
function saveNewUser(newUser: RegisterForm) {
    const usersJson = localStorage.getItem("users");
    const users: RegisterForm[] = usersJson ? JSON.parse(usersJson) : [];

    const existingUser = users.find(u => u.email === newUser.email);
    if (existingUser) {
        showPopUp("Errore", "Questa email è già registrata, vai nel log in");
        return false;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
}






export function ValidationNewUser(): boolean {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const surnameInput = document.getElementById("surname") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const paymentSelect = document.getElementById("preferPayment") as HTMLSelectElement;
    //check not empty values
    if (!nameInput.value || !surnameInput.value || !emailInput.value || !paymentSelect.value) {
        return false;
    }

    //name and surname not number
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
    if (!nameRegex.test(nameInput.value)) {
        showPopUp("Attenzione!", "Il nome non può contenere numeri o caratteri speciali")
        return false;
    }
    if (!nameRegex.test(surnameInput.value)) {
        showPopUp("Attenzione!", "Il cognome non può contenere numeri o caratteri speciali")
        return false;
    }

    //check email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showPopUp("Attenzione!", "Email non valida")
        return false;
    }

    return true;
}






function ValidationPassword(): boolean {

    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmInput = document.getElementById("confirmPassword") as HTMLInputElement;

    if (!passwordInput || !confirmInput) return false;

    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();

    if (password.length < 8) {
        showPopUp("Attenzione!", "La password deve essere di almeno 8 caratteri")
        return false;
    }

    // almeno una lettera e un numero
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!regex.test(password)) {
        showPopUp("Attenzione!", "La password deve contenere almeno una lettera e un numero")
        return false;
    }

    // conferma password
    if (password !== confirm) {
        showPopUp("Errore!", "La password deve contenere almeno una lettera ed un carattere speciale, lunghezza minima, 8 caratteri.")
        return false;
    }

    return true;
}





export function checkPassword(user: RegisterForm) {
    const isValid = ValidationPassword();

    if (!isValid) {
        showPopUp("Errore", "Le password errate e/o non corrispondono")
        return;
    }
    if (isValid) {
        user.password = (document.getElementById("password") as HTMLInputElement).value;

        // Prendi gli utenti registrati
        const usersJson = localStorage.getItem("users");
        const users: RegisterForm[] = usersJson ? JSON.parse(usersJson) : [];
    

        // Trova l’utente da aggiornare
        const existingPassword = users.find(u => u.password === user.password)
        if(existingPassword){
            showPopUp("Errore", "Password non valida, riprova");
        return false;
        }
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user; // aggiorna l’utente con la password
        }

        // Salva di nuovo l’array
        localStorage.setItem("users", JSON.stringify(users));

        showPopUp("Inserito", "La password è stata registrata")
        const closeButton = document.getElementById("closeButton");
        closeButton?.addEventListener("click", () => {
            // quando chiudi il popup torni alla pagina principale
            window.location.href = "logIn.html"
        }, { once: true }); // 'once: true' assicura che il listener si esegue solo una volta
    }
}



//check registration befor click
export function checkRegistration() {
    const submitButton = document.getElementById("submitRegistration") as HTMLButtonElement | null;
    if (submitButton) submitButton.disabled = true;
    //check inserted data are valid
    const isValid = ValidationNewUser();

    if (!isValid) {
        showPopUp("Errore", "Campi mancanti e/o inserimenti non validi")
        //if it is valid
        if (submitButton) submitButton.disabled = false;
        return;
    }

    if (isValid) {
        const newUser: RegisterForm = {
            name: (document.getElementById("name") as HTMLInputElement).value,
            surname: (document.getElementById("surname") as HTMLInputElement).value,
            email: (document.getElementById("email") as HTMLInputElement).value,
            preferPayment: (document.getElementById("preferPayment") as HTMLSelectElement).value
        }

        const saved = saveNewUser(newUser);

        if (!saved) {
            if (submitButton) submitButton.disabled = false;
            return; // email già esistente, fermiamo qui
        }

        //if it is valid
        if (submitButton) submitButton.disabled = false;
        // salvo in localStorage
        /*localStorage.setItem("user", JSON.stringify(newUser))
        console.log("Utente salvato:", newUser)*/


        insertTemplate("loginHTML", "newPasswordTemplate");
        //block submit page 
        const passwordForm = document.getElementById("passwordForm") as HTMLFormElement | null;
        passwordForm?.addEventListener("submit", (e) => {
            e.preventDefault();  // blocca il reload automatico
            if (newUser) checkPassword(newUser);
        });

    }


}

//END REGISTRATION NEW USER 








//START LOG IN 
//get the date about user 

function getRegisteredUsers(): RegisterForm[] {
    const usersJson = localStorage.getItem("users");
    return usersJson ? JSON.parse(usersJson) : [];
}

//check if it is user or admin autentification
export function submitLogIn(){
    const loginForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        if(isAdminLogin){
            checkReservedLogin(); // admin
        }else{
            checkUserLogin(); // normale
        }
    });
}


//autentification Admin
function checkReservedLogin() {

    const emailInput = document.getElementById("logInEmail") as HTMLInputElement;
    const passwordInput = document.getElementById("logInPassword") as HTMLInputElement;

    const user = reservedUsers.find(
        u => u.email === emailInput.value && u.password === passwordInput.value
    );

    if (!user) {
        showPopUp("Errore", "Accesso non autorizzato");
        return;
    }

    showPopUp("Accesso consentito", "Benvenuto nell'area riservata");

    const closeButton = document.getElementById("closeButton");
    closeButton?.addEventListener("click", () => {
    sessionStorage.setItem("adminLogged", "true");
    window.location.href = "admin.html";
}, { once: true });
}

//autentification Users
export function checkUserLogin() {

    const emailInput = document.getElementById("logInEmail") as HTMLInputElement;
    const passwordInput = document.getElementById("logInPassword") as HTMLInputElement;
    

    const users = getRegisteredUsers();
    const registeredUser = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

    if (!registeredUser) {
        showPopUp("Errore", "Nessun utente registrato");
        return;
    }

    // accesso ok
    showPopUp("Benvenuto!", `Ciao ${registeredUser.name}`);
    const closeButton = document.getElementById("closeButton");
    closeButton?.addEventListener("click", () => {
        // Vai alla pagina principale o home dopo login
        window.location.href = "index.html";
    }, { once: true });
    // qui puoi fare redirect, ad esempio:
    // window.location.href = "home.html";
}






export function showUsers(){
    const usersJson = localStorage.getItem("users");
    console.log(usersJson)

}


export function cleanOldUsers() {
    const usersJson = localStorage.getItem("users");
    if (!usersJson) return; // niente da pulire

    const users: RegisterForm[] = JSON.parse(usersJson);

    // filtra solo gli utenti che hanno una password definita
    const filteredUsers = users.filter(user => user.password && user.password.trim() !== "");

    // salva di nuovo
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    console.log("Utenti rimasti dopo la pulizia:", filteredUsers);
}



//check password and user reservate area
















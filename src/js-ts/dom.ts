//dom functions
import type { RegisterForm } from "./interfaces"; //add type bacause type it isn't in js is typescript
import { reservedUsers } from "./interfaces";
import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";
import { users } from "./interfaces";
import { generateId } from "./utils";
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

/*
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
}*/


export function showPopUp(title: string, message: string) {
    const existingPopUp = document.getElementById("custom-popup");

    if (existingPopUp) {
        cleanSection("PopUpHtml");
    }

    insertTemplate("PopUpHtml", "popUp");
    changeTextContent("popUpTitle", title);
    changeTextContent("popUpMessage", message);

    addCloseButton("custom-popup")
}




//close Button function 

export function addCloseButton(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return


    //class="btn-close" id="closeButton" aria-label="Close" type="button
    const closeBtn = document.createElement("button");
    //closeBtn.innerText = "✖";
    closeBtn.classList.add("btn-close");
    closeBtn.type = "button"

    closeBtn.addEventListener("click", () => {
        container.remove(); // elimina tutto il parent
    });
    container.style.position = "relative";
    container.appendChild(closeBtn)
}



/*
export function addCloseButton(container: string | HTMLElement) {
    let element: HTMLElement | null;
    
    if (typeof container === "string") {
        element = document.getElementById(container);
    } else {
        element = container;
    }

    if (!element) return;
    //class="btn-close" id="closeButton" aria-label="Close" type="button
    const closeBtn = document.createElement("button");
    //closeBtn.innerText = "✖";
    closeBtn.classList.add("btn-close");
    closeBtn.type = "button"

    closeBtn.addEventListener("click", () => {
        element.remove(); // elimina tutto il parent
    });

    element.style.position = "relative";
    element.appendChild(closeBtn)
}
*/


/*export function addCloseButton(
    container: string| HTMLElement ,
    onRemove?: () => void
) {
    let element: HTMLElement | null;
    
    if (typeof container === "string") {
        element = document.getElementById(container);
    } else {
        element = container;
    }

    if (!element) return;
    //class="btn-close" id="closeButton" aria-label="Close" type="button
    const closeBtn = document.createElement("button");
    //closeBtn.innerText = "✖";
    closeBtn.classList.add("btn-close");
    closeBtn.type = "button"

    closeBtn.addEventListener("click", () => {
        element!.remove();
    });

    element.style.position = "relative";
    element.appendChild(closeBtn)
}
*/

export function showPopUpSelection(title: string, message: string, checkright: string, checkleft: string) {
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

    /*closeButton?.addEventListener("click", () => {
        cleanSection("PopUpHtml");
    });*/
    addCloseButton("PopUpHtml")
}








//REGISTRATION NEW USER 
//function validation input forum ecc..

//save new users


function saveNewUser(newUser: RegisterForm) {

    const userJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");

    // normalizzo email
    const email = newUser.email.trim().toLowerCase();

    const existingUserJson = userJson.find(u => u.email.toLowerCase() === email);

    const existingUser = users.find(u => u.email.toLowerCase() === email);
    console.log("Nuovo users:", users)

    if (existingUserJson || existingUser) {
        showPopUp("Errore", "Questa email è già registrata, vai nel log in");
        setTimeout(() => {
            window.location.href = "logIn.html";
        }, 3000);
        return false;
    }



    userJson.push(newUser);
    localStorage.setItem("users", JSON.stringify(userJson));
    const allUsers: RegisterForm[] = [...users, ...userJson]
    console.log("TUTTI GLI USERS :", allUsers)

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
        //showPopUp("Attenzione!", "La password deve essere di almeno 8 caratteri")
        return false;
    }

    // almeno una lettera e un numero
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!regex.test(password)) {
        //showPopUp("Attenzione!", "La password deve contenere almeno una lettera e un numero")
        return false;
    }

    // conferma password
    if (password !== confirm) {
        //showPopUp("Errore!", "La password deve contenere almeno una lettera ed un carattere speciale, lunghezza minima, 8 caratteri.")
        return false;
    }

    return true;
}







export function checkPassword(user: RegisterForm) {
    const isValid = ValidationPassword();

    if (!isValid) {
        showPopUp("Errore", "La password deve contenere almeno una lettera ed un carattere speciale, lunghezza minima, 8 caratteri.")
        return;
    }
    if (isValid) {
        user.password = (document.getElementById("password") as HTMLInputElement).value;

        // Prendi gli utenti registrati
        const usersJson = localStorage.getItem("users");
        const users: RegisterForm[] = usersJson ? JSON.parse(usersJson) : [];


        // Trova l’utente da aggiornare
        const existingPassword = users.find(u => u.password === user.password)
        if (existingPassword) {
            showPopUp("Errore", "Password non valida, riprova");
            return false;
        }
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user; // aggiorna l’utente con la password
        }

        let idUser = generateId();
        if (idUser) {
            user.id = idUser
        }

        // Salva di nuovo l’array
        localStorage.setItem("users", JSON.stringify(users));

        showPopUp("Inserito", "La password è stata registrata")
        window.location.href = "logIn.html"
        /*const closeButton = document.getElementById("closeButton");
        closeButton?.addEventListener("click", () => {
            // quando chiudi il popup torni alla pagina principale
            window.location.href = "logIn.html"
        }, { once: true }); // 'once: true' assicura che il listener si esegue solo una volta
    */
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
        const idGenerated = generateId();
        if (idGenerated) {
            const newUser: RegisterForm = {

                name: (document.getElementById("name") as HTMLInputElement).value,
                surname: (document.getElementById("surname") as HTMLInputElement).value,
                email: (document.getElementById("email") as HTMLInputElement).value,
                preferPayment: (document.getElementById("preferPayment") as HTMLSelectElement).value,
                //add id 
                id: idGenerated

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


}

//END REGISTRATION NEW USER 








//START LOG IN 
//get the date about user 
/*
function getRegisteredUsers(): RegisterForm[] {
    const usersJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    const allUsers = [...usersJson, ...users]
    return allUsers;
}*/



export function getRegisteredUsers(): RegisterForm[] {
    const usersJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    const allUsers = [...usersJson, ...users]

    return allUsers;
}

//check if it is user or admin autentification
export function submitLogIn() {
    const loginForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        if (isAdminLogin) {
            checkReservedLogin(); // admin
        } else {
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
    window.location.href = "admin.html";

    /*const closeButton = document.getElementById("closeButton");
    closeButton?.addEventListener("click", () => {
        sessionStorage.setItem("adminLogged", "true");
        window.location.href = "admin.html";

    }, { once: true });*/
}


//autentification Users
export function checkUserLogin(): string | undefined {

    const emailInput = document.getElementById("logInEmail") as HTMLInputElement;
    const passwordInput = document.getElementById("logInPassword") as HTMLInputElement;


    const users = getRegisteredUsers();
    const registeredUser = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

    if (!registeredUser) {
        showPopUp("Errore", "Password o utente errati");
        return "";
    }

    const userId = registeredUser.id
    if (!userId) return ""
    // 🔹 SALVO l'ID dell'utente in sessionStorage----------------------------------------------------------------------------------------------
    sessionStorage.setItem("userId", userId.toString());

    console.log("userId salvato:", userId);




    // accesso ok
    showPopUp("Benvenuto!", `Ciao ${registeredUser.name}`);
    const closeButton = document.getElementById("closeButton");

    window.location.href = "index.html";

    return userId.toString();

}






export function showUsers() {
    const usersJson = localStorage.getItem("users");
    console.log(usersJson)

}


export function cleanOldUsers() {
    const usersJson = localStorage.getItem("users");
    if (!usersJson) return; // niente da pulire

    const users: RegisterForm[] = JSON.parse(usersJson);

    // filtra solo gli utenti che hanno una password definita
    const filteredUsers = users.filter(user => user.password === "126k");

    // salva di nuovo
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    console.log("Utenti rimasti dopo la pulizia:", filteredUsers);
}



//check password and user reservate area
















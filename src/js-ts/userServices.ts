import { reservedUsers, users } from "./interfaces";
import { showPopUp } from "./dom";
import type { RegisterForm } from "./interfaces";
import { ValidationNewUser, ValidationPassword } from "./validation";
import { generateId } from './utils';
import { insertTemplate } from "./templates";

//Service about users 



export function showUsers() {
    const usersJson = localStorage.getItem("users");
    console.log(usersJson)

}


export function cleanOldUsers() {
    const usersJson = localStorage.getItem("users");
    if (!usersJson) return; 

    const users: RegisterForm[] = JSON.parse(usersJson);
    const filteredUsers = users.filter(user => user.password === "126k");//it is impossible clean all 
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    console.log("Utenti rimasti dopo la pulizia:", filteredUsers);
}

export function getRegisteredUsers(): RegisterForm[] {
    const usersJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    const allUsers = [...usersJson, ...users]

    return allUsers;
}

export function showUsersAllUsers() {
    const userJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");
    const all = [...users, ...userJson]
    console.log("Tutti gli users:", all)
    console.log("Gli suser salvati nello storico: ", userJson)
}



//--Section LOG-IN USERS and ADMIN -----


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

}


//autentification Users
export function checkUserLogin(): string | undefined {

    const emailInput = document.getElementById("logInEmail") as HTMLInputElement;
    const passwordInput = document.getElementById("logInPassword") as HTMLInputElement;
    emailInput.textContent = "";
    passwordInput.textContent = "";
    const users = getRegisteredUsers();
    const registeredUser = users.find(u => u.email === emailInput.value && u.password === passwordInput.value);

    if (!registeredUser) {
        showPopUp("Errore", "Password o utente errati");
        return "";
    }

    const userId = registeredUser.id
    if (!userId) return ""
    //save user to localstorage
    sessionStorage.setItem("userId", userId.toString());

    console.log("userId salvato:", userId);

    // ok access
    showPopUp("Benvenuto!", `Ciao ${registeredUser.name}`);
    const closeButton = document.getElementById("closeButton");

    window.location.href = "index.html";

    return userId.toString();

}



//---REGISTRATION NEW USER ----


//save new users

export function saveNewUser(newUser: RegisterForm) {

    const userJson: RegisterForm[] = JSON.parse(localStorage.getItem("users") || "[]");

    //standard email
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
                return; // already existing email
            }

            //if it is valid
            if (submitButton) submitButton.disabled = false;

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




//save user with passowrd and id 

export function checkPassword(user: RegisterForm) {
    const isValid = ValidationPassword();

    if (!isValid) {
        showPopUp("Errore", "La password deve contenere almeno una lettera ed un carattere speciale, lunghezza minima, 8 caratteri.")
        return;
    }
    if (isValid) {
        user.password = (document.getElementById("password") as HTMLInputElement).value;

        // get register users
        const usersJson = localStorage.getItem("users");
        const users: RegisterForm[] = usersJson ? JSON.parse(usersJson) : [];


        // find user to upload password
        const existingPassword = users.find(u => u.password === user.password)
        if (existingPassword) {
            showPopUp("Errore", "Password non valida, riprova");
            return false;
        }
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user;
        }

        let idUser = generateId();
        if (idUser) {
            user.id = idUser
        }

        // save change
        localStorage.setItem("users", JSON.stringify(users));

        showPopUp("Inserito", "La password è stata registrata")
        window.location.href = "logIn.html"
    }
}




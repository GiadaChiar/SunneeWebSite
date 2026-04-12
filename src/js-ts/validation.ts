import { showPopUp } from "./dom";

//Data validation

//-----------------------LOGIN SECTION ------------------------------


//check validation input new user
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




//check validation password new user
export function ValidationPassword(): boolean {

    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmInput = document.getElementById("confirmPassword") as HTMLInputElement;

    if (!passwordInput || !confirmInput) return false;

    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();

    if (password.length < 8) {
        return false;
    }

    // at least a letter and a number
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!regex.test(password)) {
        return false;
    }

    // check passwords
    if (password !== confirm) {
        return false;
    }

    return true;
}



// insert new products or change it


//----check input -------------//

export function checkInputQuantity(): number | null {
    const quantityInput = (document.getElementById("quantityInput") as HTMLInputElement);
    let value = quantityInput.value.trim();
    const num = parseInt(value, 10);

    if (isNaN(num) || num < 0) {
        quantityInput.value = "";
        return null;
    }

    return num;
}


export function checkPrizeInput(): number | null {
    const prizeInput = document.getElementById("prizeInput") as HTMLInputElement;
    let value = prizeInput.value;
    if (!value) return null;

    return Number(value);
}


export function checkDescriptionInput(): string | null {
    const descriptionInput = document.getElementById("descriptionInput") as HTMLInputElement
    let value = descriptionInput.value
    if (!value) return null
    
    return value;
}



export function checkInputImage(): string | null {
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;

    let pathImage = imageInput.value
    let value = pathImage.replace("C:\\fakepath\\", "");
    
    return value;
}


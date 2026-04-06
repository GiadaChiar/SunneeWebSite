//dom functions
import type { CartItem, RegisterForm } from "./interfaces"; //add type bacause type it isn't in js is typescript
import { reservedUsers } from "./interfaces";
import { insertTemplate } from "./templates";
import { handleCheckBoxtPoPUp } from "./events";
import { users, Cliente } from "./interfaces";
import { generateId, selectedValues } from "./utils";
import type { Variant, BaseProduct } from "./interfaces";





//--------------------------------------------------STANDARD FUNCTIONs -----------------------------------------------------------------



//ALL users standard and localStorage

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


//clean element to HTML pages
export function cleanSection(sectionId: string) {

    const section = document.getElementById(sectionId);

    if (!section) {
        console.error("Section not found");
        return;
    }
    section.innerHTML = "";
}


export function showUsers() {
    const usersJson = localStorage.getItem("users");
    console.log(usersJson)

}


export function cleanOldUsers() {
    const usersJson = localStorage.getItem("users");
    if (!usersJson) return; // niente da pulire

    const users: RegisterForm[] = JSON.parse(usersJson);
    const filteredUsers = users.filter(user => user.password === "126k");//it is impossible clean all 
    localStorage.setItem("users", JSON.stringify(filteredUsers));

    console.log("Utenti rimasti dopo la pulizia:", filteredUsers);
}


//Function change text content

export function changeTextContent(elementId: string, text: string) {

    const element = document.getElementById(elementId);
    if (element)
        element.textContent = text
}



//show information popUp
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



//info and quanstion multy opstions popUp

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







//------------------------------------------------------REGISTRATION NEW USER -------------------------------------------------


//save new users

function saveNewUser(newUser: RegisterForm) {

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
function ValidationPassword(): boolean {

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





//----------------------------------------START LOGIN USER-------------------------------------------------------




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




//-------------------------------ADMIN SECTION----------------------------------------------------------


//disable dropdown in the filter to add or change products

export function disableDropdown(dropdownId: string, bool: boolean) {
    const dropdownButton = document.getElementById(dropdownId) as HTMLButtonElement;
    if (dropdownButton) {
        dropdownButton.disabled = bool; // disable
    }
}


export function showHidden(subMenuId: string) {
    const subMenu = document.getElementById(subMenuId)
    if (subMenu) {
        if (subMenu.dataset.show === "none") {
            subMenu.dataset.show = "see"
        } else {
            subMenu.dataset.show = "none"
        }
    }

}


//set gender in base typedropdown

export function genderMenu(valueDropdown: string) {
    if (valueDropdown === "sarong") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "donna");
        selectedValues.selectedGender = "woman";
        return selectedValues.selectedGender;
    }
    if (valueDropdown === "cap") {
        disableDropdown("dropdownButtonGender", true);
        changeTextContent("dropdownButtonGender", "unisex");
        selectedValues.selectedGender = "unisex";
        return selectedValues.selectedGender;
    }
    selectedValues.selectedGender = null;
    changeTextContent("dropdownButtonGender", "Genere");
    disableDropdown("dropdownButtonGender", false)
    return null

}



//----check inmput -------------//
export function checkInputQuantity(): number | null {
    const quantityInput = (document.getElementById("quantityInput") as HTMLInputElement);
    let value = quantityInput.value.trim();
    const num = parseInt(value, 10);

    if (isNaN(num) || num < 0) {
        showPopUp("Inserimento Errato", "Inserisci come quantità un numero intero positivo");
        quantityInput.value = "";
        return null;
    }

    return num;
}


export function checkPrizeInput(): number | null {
    const prizeInput = document.getElementById("prizeInput") as HTMLInputElement;
    let value = prizeInput.value;
    if (!value) return null;
    console.log("prezzo:", value)

    return Number(value);

}

export function checkDescriptionInput(): string | null {
    const descriptionInput = document.getElementById("descriptionInput") as HTMLInputElement
    let value = descriptionInput.value
    if (!value) return null
    console.log("descrizione:", value)
    return value;
}



export function checkInputImage(): string | null {
    const imageInput = document.getElementById("imageInput") as HTMLInputElement;

    let pathImage = imageInput.value
    let value = pathImage.replace("C:\\fakepath\\", "");
    console.log("link:", value)
    return value;
}





export async function insertProduct() {
    // all product 
    const existingProducts: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    //search if already existing 
    let product = existingProducts.find(p => p.type === selectedValues.selectedType && p.gender === selectedValues.selectedGender && p.image === selectedValues.selectedImage && p.description === selectedValues.selectedDescription);

    const variant = {
        size: selectedValues.selectedSize as Variant["size"],
        color: selectedValues.selectedColor as Variant["color"],
        quantity: selectedValues.selectedQuantity!,
        state: selectedValues.selectedState as "available" | "unavailable"
    };

    if (product) {
        const variantExists = product.variants.some(v => v.size === variant.size && v.color === variant.color);
        if (product.prize !== selectedValues.selectedPrize) {
            product.prize = selectedValues.selectedPrize!;
            showPopUp("Aggiornamento", "Prezzo aggiornato correttamente");
        }

        if (variantExists) {
            showPopUpSelection("Attenzione", "Prodotto già esistente, procedere con la modifica?", "SI", "NO")

            const choice = await handleCheckBoxtPoPUp();
            if (choice === "no") return
            //if yes
            product.variants = product.variants.map(v =>
                v.size === variant.size && v.color === variant.color ? { ...v, quantity: variant.quantity, state: variant.state } : v
            );
            showPopUp("Aggiornamento", "Modifica effettuata correttamente")
        } else {
            //add variable
            product.variants.push(variant);
            showPopUp("Aggiornamento", "Modifica /Inserimeto effettuato correttamente")

        }
    } else {
        // New product with variable
        product = {
            id: selectedValues.selectedId!,
            type: selectedValues.selectedType as BaseProduct["type"],
            gender: selectedValues.selectedGender as BaseProduct["gender"],
            image: selectedValues.selectedImage!,
            description: selectedValues.selectedDescription!,
            prize: selectedValues.selectedPrize!,
            variants: [variant]
        };
        existingProducts.push(product);
        console.log("Nuovo prodotto creato:", product);
        showPopUp("Inserimeto", "Inserimeto effettuato correttamente")
    }
    localStorage.setItem("products", JSON.stringify(existingProducts));
    console.log(existingProducts)
}


//create table 
export function createTable(products: BaseProduct[]) {
    const existingTable = document.getElementById("tableTemplateShow")
    if (existingTable) {
        cleanSection("tableHTML")
    }
    insertTemplate("tableHTML", "tableTemplate");

    const productsSection = document.getElementById("products-table")

    if (!productsSection) return

    products.forEach(product => {
        //header products
        const productHeader = document.createElement("tr");
        productHeader.classList.add("table-active");
        productHeader.innerHTML = `
            <td>Id</td>
            <td>Tipologia</td>
            <td>Genere</td>
            <td>Immagine</td>
            <td>Prezzo</td>
            <td>Descrizione</td>
            
        `;
        productsSection.append(productHeader)

        const tr = document.createElement("tr");
        tr.classList.add("table-success");
        tr.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.type}</td>
            <td>${product.gender}</td>
            <td><img src="../img/${product.image}" width="50"</td>
            <td>${product.prize}</td>
            <td>${product.description}</td>
        </tr>
        `;
        productsSection.append(tr)

        //header variants
        const variantHeader = document.createElement("tr");
        variantHeader.classList.add("table-secondary");
        variantHeader.innerHTML = `
            <td>Variabili</td>
            <td>Taglia</td>
            <td>Colore</td>
            <td>Quantità</td>
            <td>Stato</td>
            <td>-</td>
        `;

        productsSection.appendChild(variantHeader);



        product.variants.forEach(variant => {
            const variantRow = document.createElement("tr");
            variantRow.innerHTML += `
        <tr>
            <td>Caratteristiche:</td>
            <td>${variant.size}</td>
            <td>${variant.color}</td>
            <td>${variant.quantity}</td>
            <td>${variant.state}</td>
            <td>-</td>
        </tr>
        `;

            productsSection.appendChild(variantRow);
        });
        console.log(product.id)
    })

    console.log("prodotti:", products)
    console.log(JSON.stringify(products, null, 2));

}

//no change text 
function getDropdownValue(buttonId: string): string | null {
    const button = document.getElementById(buttonId);

    if (!button || !button.textContent) return null;

    return button.textContent.trim();
}



//----------------------------------------SHOP SECTION-----------------------------------------------------







export function checkedFilterShop(check: HTMLElement, allElement: NodeListOf<HTMLElement>):string | ""{
    let selected = check.dataset.value || ""

    if (check.classList.contains("anable")) {
        check.classList.remove("anable");
        check.classList.add("disable");

        if (check instanceof HTMLInputElement) {
            check.checked = false;

        }
        selected = "";
        console.log("disattivato");
    } else {

        allElement.forEach(el => {
            el.classList.remove("anable");
            el.classList.add("disable");
            if(el instanceof HTMLInputElement){
                el.checked = false;
            }
            
        });

        if(check.dataset.state === "unavailable") return ""

        check.classList.remove("disable");
        check.classList.add("anable");
        if ( check instanceof HTMLInputElement) {
            check.checked = true;

        }

        selected = check.dataset.value || "";
        console.log("attivato:", selected);
    }
    return selected;
}







export function checkColorCardShop(products: BaseProduct[], target: HTMLInputElement, clone: HTMLElement): string | "" {
    if (!clone) return "";

    const productId = target.name.replace("color-", "");

    const product = products.find(p => p.id === productId);
    if (!product) return "";


    console.log("Colore selezionato:", target.value);
    //find id product 

    // Aggiorna lo stato dei pulsanti taglie
    const sizeButtons = clone.querySelectorAll<HTMLButtonElement>(".filter-btn");

    sizeButtons.forEach(button => {
        const sizeValue = button.dataset.value;
        const available = product.variants.some(
            v => v.size === sizeValue && v.color === target.value
        );
        button.dataset.state = available ? "available" : "unavailable";

    });
    return target.value

}








//---------------------CART SECTION------------------------------------------------------


// calc total to pay
export function setSUmTotCart(products: ReturnType<Cliente['getDetailedCart']>) {

    //for each products price and quantity
    const productInfo = products.map(p => ({
        price: p?.price ?? 0,
        quantity: p?.quantity ?? 0,
        total: (p?.price ?? 0) * (p?.quantity ?? 0)
    }));

    const totalCart = productInfo.reduce((sum, item) => sum + item.total, 0);
    console.log("La somma totale è :", totalCart)
    let result = totalCart.toFixed(2);
    changeTextContent("sommaTot", `${result} €`);
}

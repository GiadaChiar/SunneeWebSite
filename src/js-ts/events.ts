
import { changeTextContent, showHidden, initGenericDropdown, showPopUp, genderMenu, cleanSection, createTable, checkedFilterShop } from './dom';
import { setAdminLogin, getAdminLogin } from './utils';
import { setReservatePage } from './logIn';
import { checkReservedLogin, checkUserLogin, getRegisteredUsers } from './userServices';
import { buildProductFromForm, insertProduct, getSelectedColor } from "./productService";
import { ProductService } from "./productInterfaces";
import type { BaseProduct, Variant } from './productInterfaces';
import type { CartItem } from "./cartInterfaces";
import { ShopClient } from "./cartInterfaces";
import { insertTemplate } from "./templates";


//--------START LOGIN PART -------------------------------------------




export function logInListenerClick(){
    document.addEventListener("click", (e)=>{
        const target = e.target as HTMLElement

        const linkReservateArea = target.closest("#buttonLinkHTML") as HTMLElement;

        if(linkReservateArea){

            setAdminLogin(true);
            setReservatePage();

        }
    })
}









//if I click to button access I have to undestand if it is a loggerUser or loggerAdmin section
export function submitLogIn() {
    const loginForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        if (getAdminLogin()) {
            console.log("E' ADMIN")
            checkReservedLogin(); // admin
        } else {
                console.log("E' UN USER")
                checkUserLogin(); // standard
        }
    }
)};


//New user Registration 


//check event for registration 
export function setUpNewSection(eventId: string, sectionId: string, templateId: string) {

    const linkClicked = document.getElementById(eventId);

    if (!linkClicked) {
        console.error("Link not found");
        return;
    }

    linkClicked.addEventListener("click", (event) => {
        event.preventDefault();
        insertTemplate(sectionId, templateId);
    });
}




//------------END LOGIN PART --------------------------------


//------------START ADMIN PART ----------------------------------------------



export function initTypeDropdown(): void {
    const buttonType = document.getElementById("typeDropdown");

    buttonType?.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.classList.contains("dropdown-item")) {

            const nameDropdown = target.getAttribute("name") || "";
            let valueDropdown = target.getAttribute("value") || "";

            if (valueDropdown == "swimSuit") {
                event.preventDefault();//still open
                event.stopPropagation();
                showHidden("submenuType");
                return
            }
            if (target.closest("#submenuType")) {
                const nameUnderMenu = target.getAttribute("name") || "";
                let valueUnderMenu = target.getAttribute("data-value") || "";
                changeTextContent("dropdownButtonType", nameUnderMenu);

                document.getElementById("dropdownButtonType")
                    ?.setAttribute("data-value", valueUnderMenu);

                genderMenu(valueUnderMenu);
                return
            }
            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {

                changeTextContent("dropdownButtonType", nameDropdown)
                document.getElementById("dropdownButtonType")
                    ?.setAttribute("data-value", valueDropdown);

                genderMenu(valueDropdown)
                return
            }
        }
    })
}




//Listeren 
export function initGlobalClickListener() {
    const input = document.getElementById("searchIdInput") as HTMLInputElement;

    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target) return;

        if (target.id === "submitSearch") {
            createTable(ProductService.getAll());
        }

        if (target.id === "searchById") {
            const product = ProductService.findById(input.value);
            if (product) createTable([product]);
            else showPopUp("Errore", "Prodotto non trovato");
        }

        if (target.id === "deleteProduct") {
            ProductService.delete(input.value);
            createTable(ProductService.getAll());
        }

        initGenericDropdown(target, "sizeDropdown", "dropdownButtonSize");
        initGenericDropdown(target, "colorDropdown", "dropdownButtonColor");
        initGenericDropdown(target, "stateDropdown", "dropdownButtonState");
        initGenericDropdown(target, "genderDropdown", "dropdownButtonGender");   
    
    });
}






//send information/save change 

export function handleFormSubmit() {
    const form = document.getElementById("submitSave");

    form?.addEventListener("click", async (event) => {
        event.preventDefault();

        const productData = buildProductFromForm();
        if (!productData) {
            showPopUp("Errore", "Compila tutti i campi");
            return;
        }

        await insertProduct(productData); 
    });
}



///PopUpSelect the box listener
export function handleCheckBoxtPoPUp(): Promise<"yes" | "no"> {
    return new Promise((resolve) => {

        const popup = document.getElementById("custom-popup");
        if (!popup) return;

        const checkRight = popup.querySelector("#popUCheckright") as HTMLInputElement;
        const saveButton = popup.querySelector("#saveCheck") as HTMLButtonElement;

        saveButton?.addEventListener("click", (event) => {
            event.preventDefault();
            if (checkRight.checked) resolve("yes")
            else resolve("no");
            cleanSection("PopUpHtml");
        });
    })
}




//------------END ADMIN PART -------------------------------------------

//---------------START SHOP PART ------------------------------------------



//--------------END SHOP PART-----------------------------------------


export function setupColorSelection(products: BaseProduct[]) {
    const shopSection = document.getElementById("shopProductHTML");
    if (!shopSection) return;

    let sizeElement = "";

    shopSection.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        const button = target.closest("button") as HTMLButtonElement;
        const clone = target.closest(".container") as HTMLElement;
        const loggedUserId = sessionStorage.getItem("userId");

        let selectedColor = getSelectedColor(target, clone, products);
        sizeElement = handleSizeSelection(button, sizeElement);

        handleAddToCart(button, clone, selectedColor, sizeElement, products, loggedUserId);
    });
}




function handleAddToCart(
    button: HTMLButtonElement | null,
    clone: HTMLElement,
    selectedColor: string,
    sizeElement: string,
    products: BaseProduct[],
    loggedUserId: string | null
) {
    if (!button || button.type !== "button" || button.name !== "cart") return;
    if (!clone) return;

    if (!loggedUserId) {
        showPopUp("Attenzione", "Fai il login per procedere all'acquisto");
        return;
    }

    if (selectedColor === "") {
        showPopUp("Errore", "Seleziona il colore desiderato");
        return;
    }

    if (sizeElement === "") {
        showPopUp("Errore", "Seleziona la taglia desiderata");
        return;
    }

    const users = getRegisteredUsers();
    const savedCart = sessionStorage.getItem("cart");
    const userData = users.find(u => u.id === loggedUserId);

    if (!userData) return;

    const client = new ShopClient(userData);

    if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        client.loadCart(cartItems);
        console.log("cliente salvato: ", client)
    }

    client.addToCart({
        userId: loggedUserId,
        productId: button.id,
        size: sizeElement as Variant["size"],
        color: selectedColor as Variant["color"],
        quantity: 1
    }, products, loggedUserId);

    sessionStorage.setItem("cart", JSON.stringify(client.getCart()));
    window.location.href = "cart.html";
}





function handleSizeSelection(
    button: HTMLButtonElement | null,
    currentSize: string
): string {
    if (button && button.classList.contains("template")) {
        const allButtons = document.querySelectorAll<HTMLButtonElement>(
            'button[data-filter-type="size"]'
        );

        return checkedFilterShop(button, allButtons);
    }

    return currentSize;
}





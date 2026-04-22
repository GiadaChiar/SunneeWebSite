
import { changeTextContent, showHidden, initGenericDropdown, showPopUp, genderMenu, cleanSection  } from './dom';
import { setAdminLogin, getAdminLogin} from './utils';
import { setReservatePage } from './logIn';
import { checkReservedLogin} from './userServices';
import { buildProductFromForm, insertProduct } from "./productService";


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
           // checkUserLogin(); // standard
        }
    }, { once: true })
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
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target) return;

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
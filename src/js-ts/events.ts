
//event functions

import { cleanSection, changeTextContent, checkUserLogin, showPopUp, setSUmTotCart, getRegisteredUsers, showPopUpSelection, checkReservedLogin, showHidden, genderMenu,checkDescriptionInput,checkPassword,checkPrizeInput,checkInputQuantity,checkRegistration,checkInputImage,insertProduct,createTable, checkedFilterShop,checkColorCardShop } from "./dom";
import { Cliente } from './interfaces';
import { insertTemplate, changeCartTemplate } from './templates';
import { ProductsDefault } from './initProducts';
import { InsertTemplateShopFilter} from "./shop";
import type { BaseProduct, Variant, CartItem } from './interfaces';
import { setAdminLogin, getAdminLogin,selectedValues,generateId } from './utils';
















//------------------------------------STANDARD FUNCTIONS-----------------------------------------------





export function preventSubmitLogIn() {
    const registrationForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;
    registrationForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        checkUserLogin();
    });

}





///PopUpSelect the box listener
export function handleCheckBoxtPoPUp(): Promise<"yes" | "no"> {
    return new Promise((resolve) => {
        
        const popup = document.getElementById("custom-popup");
        if (!popup) return;

        const checkRight = popup.querySelector("#popUCheckright") as HTMLInputElement;
        //const checkLeft = popup.querySelector("#popUCheckleft") as HTMLInputElement;
        const saveButton = popup.querySelector("#saveCheck") as HTMLButtonElement;

        saveButton?.addEventListener("click", (event) => {
            event.preventDefault();
            if (checkRight.checked) resolve("yes")
            else resolve("no");
            cleanSection("PopUpHtml");
        });
    })
}









// ----------------------------LOGIN PART----------------------------




//function to setUp elements if I click on reservate area
export function setReservateLogIn() {
    const linkReservateArea = document.getElementById("buttonLinkHTML") as HTMLElement | null;
    //click 
    linkReservateArea?.addEventListener("click", function () {
        cleanSection("buttonLinkHTML");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn", "Accesso Riservato:");
        setAdminLogin(true);
        submitLogIn();
    })

}



//if I click to button access I have to undestand if it is a loggerUser or loggerAdmin section
export function submitLogIn() {
    const loginForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;

    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();

        if (getAdminLogin()) {
            checkReservedLogin(); // admin
        } else {
            checkUserLogin(); // standard
        }
    }, { once: true })
}







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




//--------------------------------------------------ADMIN SECTION -----------------------------------------------------------------

//PROVA A METTERE UN SOLO LISTENER O A DIMINUIRNE IL NUMERO **************************************************************
/*
container?.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    if(target.id === "submitSearch") {...}
    if(target.id === "searchById") {...}
    if(target.id === "deleteProduct") {...}
})

*/



export function initTypeDropdown() {
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
            }
            if (target.closest("#submenuType")) {
                const nameUnderMenu = target.getAttribute("name") || "";
                let valueUnderMenu = target.getAttribute("data-value") || "";
                changeTextContent("dropdownButtonType", nameUnderMenu);
                genderMenu(valueUnderMenu)
                document.getElementById("dropdownButtonType")
                    ?.setAttribute("data-value", valueUnderMenu);
                selectedValues.selectedType = valueUnderMenu
                return selectedValues.selectedType;
            }
            if (valueDropdown !== "swimSuit" && valueDropdown !== null && nameDropdown !== null) {
                genderMenu(valueDropdown)

                changeTextContent("dropdownButtonType", nameDropdown)
                document.getElementById("dropdownButtonType")
                    ?.setAttribute("data-value", valueDropdown);
                selectedValues.selectedType = valueDropdown;
                return selectedValues.selectedType;
            }
        }
    })
}



//click on multy dropdown
export function initDropdown(dropdownId: string, buttonId: string) {
    const dropdown = document.getElementById(dropdownId);
    dropdown?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target.classList.contains("dropdown-item")) return;

        const name = target.getAttribute("name") || "";
        const value = target.getAttribute("value") || "";

        // change button text
        changeTextContent(buttonId, name);


        // in base type you have a specific gender or a selection
        if (dropdownId === "typeDropdown") {
            genderMenu(value);
        }
        if (dropdownId === "sizeDropdown") {
            selectedValues.selectedSize = value
            return selectedValues.selectedSize
        }
        if (dropdownId === "colorDropdown") {
            selectedValues.selectedColor = value
            return selectedValues.selectedColor
        }
        if (dropdownId === "stateDropdown") {
            selectedValues.selectedState = value
            return selectedValues.selectedState
        }
        if (dropdownId === "genderDropdown") {
            selectedValues.selectedGender = value
            return selectedValues.selectedGender
        }
    });
}








export function getInsertOptions() {
    const form = document.getElementById("dropdwons")
    form?.addEventListener("submit", (event) => {
        event.preventDefault();


        selectedValues.selectedDescription = checkDescriptionInput();
        selectedValues.selectedQuantity = checkInputQuantity();

        if (selectedValues.selectedQuantity === null) return

        selectedValues.selectedPrize = checkPrizeInput();
        selectedValues.selectedImage = checkInputImage();


        const isValid =
            selectedValues.selectedType !== null &&
            selectedValues.selectedSize !== null &&
            selectedValues.selectedColor !== null &&
            selectedValues.selectedGender !== null &&
            selectedValues.selectedImage !== null &&
            selectedValues.selectedDescription !== null &&
            selectedValues.selectedPrize !== null &&
            selectedValues.selectedQuantity !== null;
        if (isValid) {
            if (!selectedValues.selectedState) {
                selectedValues.selectedState = selectedValues.selectedQuantity > 0 ? "available" : "unavailable";
            }
            selectedValues.selectedId = generateId()
            insertProduct()
            console.log("CAMPI INSERITIII")
            console.log("tipologia:", selectedValues.selectedType);
            console.log("prezzo", selectedValues.selectedPrize);
            console.log("genere:", selectedValues.selectedGender);
            console.log("id", selectedValues.selectedId);
            console.log("descrizione", selectedValues.selectedDescription);
            console.log("immagine", selectedValues.selectedImage);
            console.log("quantità:", selectedValues.selectedQuantity);
            console.log("stato", selectedValues.selectedState);
        } else {
            showPopUp("Errore", "Compila tutti i campi obbligatori")
        }
    });

}


export function initSearchSection() {
    const container = document.querySelector(".search-container");
    const insertIdSearch = document.getElementById("searchIdInput") as HTMLInputElement;

    container?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!target) return;

        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");

        // show all
        if (target.id === "submitSearch") {
            createTable(products);
            return;
        }

        // search
        if (target.id === "searchById") {
            const insertId = insertIdSearch.value.trim();
            if (!insertId) return;

            const existingProduct = products.find(p => p.id === insertId);
            if (existingProduct) {
                createTable([existingProduct]);
            } else {
                showPopUp("Errore", "Prodotto non trovato, id errato o inesistente");
            }
            return;
        }

        // delete
        if (target.id === "deleteProduct") {
            const insertId = insertIdSearch.value.trim();
            if (!insertId) return;

            const updatedProducts = products.filter(p => p.id !== insertId);
            if (updatedProducts.length === products.length) {
                showPopUp("Errore", "Prodotto non trovato, id errato o inesistente");
                return;
            }

            localStorage.setItem("products", JSON.stringify(updatedProducts));
            showPopUp("Successo", "Prodotto eliminato correttamente");
            createTable(updatedProducts);
            return;
        }
    });
}



//----------------------------------SHOP SECTION-----------------------------------------------------------------------------

















let cliente: Cliente | null = null;

// global listener for shop page
export function setupColorSelection(products: BaseProduct[]) {
    const shopSection = document.getElementById("shopProductHTML");
    if (!shopSection) return;
    let sizeElement = "";

        shopSection.addEventListener("click", (event) => {
            const button = (event.target as HTMLElement).closest("button") as HTMLButtonElement;
            const target = event.target as HTMLInputElement;
            const clone = target.closest(".container") as HTMLElement;
            const loggedUserId = sessionStorage.getItem("userId");
                console.log("userId trovato:", loggedUserId);
            let selectedColor = clone.querySelector<HTMLInputElement>(
                    'input.check-shop-color:checked'
                )?.value || "";
                console.log("COLORE SELEZIONATO:", selectedColor);

            // check card color selected
            if (target?.classList.contains("check-shop-color") && target.type === "radio") {

                selectedColor = checkColorCardShop(products, target, clone)
                console.log("COLOREEEEE:", selectedColor)
            }

            //buttons size inside the cart 
            if (button && button.classList.contains("template")) {
                console.log("bottone size cliccato")
                //get all buttons to change class
                const allButtons = document.querySelectorAll<HTMLButtonElement>('button[data-filter-type="size"]')
                sizeElement = checkedFilterShop(button, allButtons)
                console.log("FINE FUNZIONE Taglia TROVATO:", sizeElement)
            }

            //button car inside the cart 
            if (button && button.type === "button" && button.name === "cart") {
                if (!clone) return;
                console.log("CLICCATO CARELLAOO");
                

                if (loggedUserId) {
                    console.log("ID dell'utente loggato:", loggedUserId);
                } else {
                    showPopUp("Attenzione", "Fai il login per procedere all'acquisto")
                }
                if (selectedColor === "") {
                    showPopUp("Errore", "Seleziona il colore desiderato")
                    return
                }
                if (sizeElement === "") {
                    showPopUp("Errore", "Seleziona la taglia desiderata");
                    return
                }
                const idProduct = button.id
                console.log("Id prodotto:", idProduct)
                console.log("Color product:", selectedColor)
                console.log("size product:", sizeElement)

                //serch my client logged 
                const users = getRegisteredUsers();
                const savedCart = sessionStorage.getItem("cart");//old carts

                const userData = users.find(u => u.id === loggedUserId);
                if (userData) {
                    cliente = new Cliente(userData);
                    console.log("Cliente creato:", cliente);

                    if (savedCart) {
                        const cartItems: CartItem[] = JSON.parse(savedCart);
                        cliente.loadCart(cartItems); // carico eventuali elementi già presenti
                    } //create my new client 

                    if (cliente && loggedUserId) {
                        cliente.addToCart({
                            userId: loggedUserId,
                            productId: button.id,
                            size: sizeElement as Variant["size"],
                            color: selectedColor as Variant["color"],
                            quantity: 1
                        }, products, loggedUserId!);
                        //save info 
                        sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
                        console.log("IL cliente salvato è:", cliente)
                        window.location.href = "cart.html";
                    }
                }
            }
        });
}





export function getfiltersPageShop(productsBase: BaseProduct[]) {
    const form = document.getElementById("filter");
    let selectedColorFilter = "";
    let selectedSizeFilter = "";

    form?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        if ((target as HTMLInputElement).type === "radio" && (target as HTMLInputElement).name === "color") {
            const clickedRadio = target as HTMLInputElement;
            const allRadios = document.querySelectorAll<HTMLInputElement>('input[name="color"]')

            selectedColorFilter = checkedFilterShop(clickedRadio, allRadios)
            console.log("FINE FUNZIONE COLORE TROVATO:", selectedColorFilter)
        }

        if ((target as HTMLButtonElement).name === "size") {
            event.preventDefault();
            const clickedButton = target as HTMLButtonElement;
            const allSizeButtons = document.querySelectorAll<HTMLButtonElement>('button[name="size"]');

            selectedSizeFilter = checkedFilterShop(clickedButton, allSizeButtons)
            console.log("FINE FUNZIONE Taglia TROVATO:", selectedSizeFilter)
        }

        if ((target as HTMLButtonElement).type === "submit" && (target as HTMLButtonElement).name === "searchFilters") {
            event.preventDefault();

            console.log("COLORE FITRO PAGINA:", selectedColorFilter);
            console.log("Taglia FITRO PAGINA:", selectedSizeFilter);


            InsertTemplateShopFilter(selectedColorFilter, selectedSizeFilter, productsBase);
        }
    })
}

























//----------------------CART SECTION ---------------------------------------------------







export function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<Cliente['getDetailedCart']>) {
    const sectionCart = document.getElementById("cartSection")
    if (!sectionCart) return
    console.log("okkk")

    sectionCart?.addEventListener("click", (event) => {

        const users = getRegisteredUsers();
        const userData = users.find(u => u.id === userLogId);
        if (!userData) return;

        const cliente = new Cliente(userData);
        const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
        cliente.loadCart(savedCarts.filter(c => c.userId === userLogId))
        const target = event.target as HTMLElement;
        const addButton = target.closest(".bnt-add") as HTMLButtonElement | null;
        const clikedLessButton = target.closest(".bnt-less") as HTMLButtonElement | null;
        const clone = target.closest(".container-cart") as HTMLElement | null;
        const deleteButton = target.closest(".btn-close") as HTMLButtonElement | null
        const savedCart = sessionStorage.getItem("cart");
        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

        if (!clone) return

        let productId = clone.dataset.id;
        let productSize = clone.dataset.size;
        let productColor = clone.dataset.color;
        let quantityElement = clone.querySelector(".quantity") as HTMLElement | null;

        if (!quantityElement) return

        let textQuantity = parseInt(quantityElement.textContent || "0");
        const lessButton = clone.querySelector(".bnt-less") as HTMLButtonElement | null;
        console.log("Quantità standard:", textQuantity)

        if (addButton) {
            console.log("Quantità da catalogo disponibile:", productId, productColor, productSize)

            const product = allProducts.find(p => p.id === productId)
            if (product) {
                const selectedProduct = product.variants.find(v => v.color === productColor && v.size === productSize)
                const quantityProduct = selectedProduct?.quantity
                console.log("Quantità disponibile:", quantityProduct)

                if (quantityProduct && textQuantity >= quantityProduct) {
                    console.log("Prodotto disponibile:", quantityProduct, "Prodotto ordinabile >= ", textQuantity)
                    addButton.classList.remove("anable")
                    addButton.classList.add("disable");
                    console.log("Quantità non disponible");
                    showPopUp("Attenzione", "E' stato raggiunto il numero massimo di prodotti disponibili")
                    return;
                }
            }

            let productcart = productsCart.find(p => p && p.userId === userLogId && p.productId === productId && p.color === productColor && p.size === productSize)
            if (productcart) {
                textQuantity++;
                productcart.quantity = textQuantity;
                console.log("prodotto carrello modificato qunatità ora è: ", productcart.quantity)

                cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, textQuantity);

                // salva di nuovo
                sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
                setSUmTotCart(productsCart);

                //quantityElement?.textContent = quantityNumebr.toString();
                console.log("BOTTONE +++ TROVATOOO", textQuantity)
                quantityElement.textContent = textQuantity.toString()
                if (textQuantity > 1 && lessButton && lessButton.classList.contains("disable")) {
                    lessButton.classList.remove("disable")
                    lessButton.classList.add("anable")
                }
            }
        } if (clikedLessButton && textQuantity > 1) {
            textQuantity--;
            let productcart = productsCart.find(p => p && p.userId === userLogId && p.productId === productId && p.color === productColor && p.size === productSize)
            if (!productcart) {
                console.log("Quantità non trovata", productcart)
            } else {
                productcart.quantity = textQuantity;
                console.log("prodotto carrello modificato qunatità ora è: ", productcart.quantity);
                cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, textQuantity);

                //save it 
                sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()))
                setSUmTotCart(productsCart);
            }

            quantityElement.textContent = textQuantity.toString();
            if (textQuantity <= 1 && lessButton) {
                lessButton.classList.remove("anable")
                lessButton.classList.add("disable");
            }
        }

        //if I click delete btn 
        if (deleteButton) {
            if (!clone) return;
            console.log("DELETE BUTTON cliccato!");
            const productId = clone.dataset.id;
            console.log("INIZIOOOO  CARRELLO", savedCart)
            if (productId) {
                console.log(productId, productColor, productSize)
                cliente.removeFromCart(productId, productColor, productSize)
                sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
                const updatedDetailedCart = cliente.getDetailedCart([...ProductsDefault, ...products], userLogId);

                // update dom
                setSUmTotCart(updatedDetailedCart);
                clone.remove();
            }
            return
        }
    })

}









//DIVIDO LA FUNZIONE MAESTRA LA PRIMA è QUELLA DA RICHIAMARE  ----------------------/












//FINE SPETTEZA,E-------------------------------------------------------------------




export async function clickToOrderCart(sectionId: string) {
    const orderButton = document.getElementById("buyButton") as HTMLButtonElement;
    orderButton.addEventListener("click", async () => {
        console.log("cliccatooojnijbugfbi")
        showPopUpSelection("Attenzione", "Effettuare l'ordine?", "SI", "NO")
        const choice = await handleCheckBoxtPoPUp();
        if (choice === "no") return

        const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const loggedUserId = sessionStorage.getItem("userId");
        const users = getRegisteredUsers();
        const userData = users.find(u => u.id === loggedUserId);
        
        if (!userData) return;

        const cliente = new Cliente(userData);

        cliente.loadCart(savedCarts.filter(c => c.userId === loggedUserId))
        console.log("USER LOGGATO IN QUESTO MOMENTO: ", loggedUserId)

        const myCart = savedCarts.filter(item => item.userId === loggedUserId)
        console.log("TROVATOOO", myCart)

        //all products
        const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
        const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

        const produsctInfo = myCart.map(p => ({
            id: p?.productId,
            color: p?.color,
            size: p?.size,
            quantityOrder: p?.quantity,
        }))
        console.log(produsctInfo)

        produsctInfo.forEach(item => {
            const product = allProducts.find(p => p.id === item.id);

            if (!product) {
                console.warn("Prodotto non trovato:", item.id);
                return;
            }

            const variant = product.variants.find(v =>
                v.color === item.color && v.size === item.size
            );

            if (!variant) {
                console.warn("Variante non trovata:", item);
                return;
            }

            console.log("PRIMA:", variant.quantity);
            if (variant.quantity < item.quantityOrder) {
                showPopUp("ERRORE", "La quantità disponibile è minore di quella richiesta")
            }

            variant.quantity -= item.quantityOrder;

            console.log("DOPO:", variant.quantity);
            if (variant.quantity === 0) {
                variant.state = "unavailable";
            }
            //save 
            localStorage.setItem("products", JSON.stringify(products));

            //clean cart
            if (loggedUserId)
                cliente.cleanFromCart(loggedUserId)
        });

        cleanSection("cartHTML"); //clean template 
        cleanSection("Total");
        showPopUp("Conferma", "Pagamento effettuato con successo")

    })
}

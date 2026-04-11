
//event functions

import { cleanSection, changeTextContent, showPopUp, setSumTotCart, showPopUpSelection, showHidden, genderMenu, createTable, checkedFilterShop } from './dom';
import { Cliente, ProductService } from './interfaces';
import { insertTemplate } from './templates';
import { ProductsDefault } from './initProducts';
import { InsertTemplateShopFilter } from "./shop";
import type { BaseProduct, Variant, CartItem} from './interfaces';
import { setAdminLogin, getAdminLogin, generateId } from './utils';
import { checkUserLogin,checkReservedLogin, getRegisteredUsers } from './userServices';
import { checkDescriptionInput, checkPrizeInput, checkInputQuantity, checkInputImage } from './validation'
import { insertProduct,checkColorCardShop } from './productService';





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




export function initTypeDropdown():void {
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



function getTypeValue(): string | null {
    return document
        .getElementById("dropdownButtonType")
        ?.getAttribute("data-value") || null;
}



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

function initGenericDropdown(target: HTMLElement, dropdownId: string, buttonId: string) {
    if (!target.classList.contains("dropdown-item")) return;
    if (!target.closest(`#${dropdownId}`)) return;
    
    const name = target.getAttribute("name") || "";
    const value = target.getAttribute("value") || "";

    // change button text
    changeTextContent(buttonId, name);

    //save value in dom like type 
    document
        .getElementById(buttonId)
        ?.setAttribute("data-value", value);

    // in base type you have a specific gender or a selection
    if (dropdownId === "typeDropdown") {
        genderMenu(value);
        return;
    }
    
};



function getDropdownValue(buttonId: string): string | null {
    return document
        .getElementById(buttonId)
        ?.getAttribute("data-value") || null;
}



// BUILD PRODUCT
// ----------------------
export function buildProductFromForm(): BaseProduct | null {
    const type = getTypeValue();
    if (!type) return null;

    genderMenu(type); 
    const gender = getDropdownValue("dropdownButtonGender");

    const size = getDropdownValue("dropdownButtonSize");
    const color = getDropdownValue("dropdownButtonColor");
    const state = getDropdownValue("dropdownButtonState");
    
    const quantity = checkInputQuantity();
    const prize = checkPrizeInput();
    const description = checkDescriptionInput();
    const image = checkInputImage();

    
    if (
        !type || !size || !color || !gender ||
        quantity === null || prize === null || !description || !image
    ) {
        return null;
    }

    return {
        id: generateId(),
        type: type as BaseProduct["type"],
        gender: gender as BaseProduct["gender"],
        prize,
        image,
        description,
        variants: [
            {
                size: size as Variant["size"],
                color: color as Variant["color"],
                quantity,
                state: (state as Variant["state"]) || (quantity > 0 ? "available" : "unavailable")
            }
        ]
    };
}





export function handleFormSubmit() {
    const form = document.getElementById("submitSave");

    form?.addEventListener("click", async (event) => {
        event.preventDefault(); 

        const productData = buildProductFromForm();
        if (!productData) {
            showPopUp("Errore", "Compila tutti i campi");
            return;
        }

        await insertProduct(productData); // usa la logica business fuori dalla classe

        console.log("Prodotto inserito o aggiornato", productData);
    });
}





// ----------------------
// SEARCH / DELETE
// ----------------------
export function initSearchSection() {
    const container = document.querySelector(".search-container");
    const input = document.getElementById("searchIdInput") as HTMLInputElement;

    container?.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

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
    });
}



//----------------------------------SHOP SECTION-----------------------------------------------------------------------------



let cliente: Cliente | null = null;

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



function getSelectedColor(
    target: HTMLElement,
    clone: HTMLElement,
    products: BaseProduct[]
): string {
    let selectedColor =
        clone?.querySelector<HTMLInputElement>('input.check-shop-color:checked')?.value || "";

    if (target?.classList.contains("check-shop-color") && (target as HTMLInputElement).type === "radio") {
        selectedColor = checkColorCardShop(products, target as HTMLInputElement, clone);
    }

    return selectedColor;
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

    const cliente = new Cliente(userData);

    if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        cliente.loadCart(cartItems);
    }

    cliente.addToCart({
        userId: loggedUserId,
        productId: button.id,
        size: sizeElement as Variant["size"],
        color: selectedColor as Variant["color"],
        quantity: 1
    }, products, loggedUserId);

    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
    window.location.href = "cart.html";
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



export function cartSetNumberProduct(
    userLogId: string,
    productsCart: ReturnType<Cliente['getDetailedCart']>
) {
    const sectionCart = document.getElementById("cartSection");
    if (!sectionCart) return;

    sectionCart.addEventListener("click", (event) => {
        const context = buildCartContext(event, userLogId);
        if (!context) return;

        const {
            cliente,
            target,
            clone,
            addButton,
            lessButtonClick,
            deleteButton,
            quantityElement,
            textQuantity,
            allProducts
        } = context;

        handleAdd(
            addButton,
            context,
            productsCart,
            allProducts
        );

        handleLess(
            lessButtonClick,
            context,
            productsCart
        );

        handleDelete(
            deleteButton,
            context,
            productsCart,
            userLogId
        );
    });
}




function buildCartContext(event: Event, userLogId: string) {
    const target = event.target as HTMLElement;
    const clone = target.closest(".container-cart") as HTMLElement | null;
    if (!clone) return null;

    const users = getRegisteredUsers();
    const userData = users.find(u => u.id === userLogId);
    if (!userData) return null;

    const cliente = new Cliente(userData);
    const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cliente.loadCart(savedCarts.filter(c => c.userId === userLogId));

    const addButton = target.closest(".bnt-add") as HTMLButtonElement | null;
    const lessButtonClick = target.closest(".bnt-less") as HTMLButtonElement | null;
    const deleteButton = target.closest(".btn-close") as HTMLButtonElement | null;

    const quantityElement = clone.querySelector(".quantity") as HTMLElement | null;
    if (!quantityElement) return null;

    const textQuantity = parseInt(quantityElement.textContent || "0");

    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    const allProducts: BaseProduct[] = [...ProductsDefault, ...products];

    return {
        target,
        clone,
        cliente,
        addButton,
        lessButtonClick,
        deleteButton,
        quantityElement,
        textQuantity,
        allProducts
    };
}



function handleAdd(
    addButton: HTMLButtonElement | null,
    ctx: any,
    productsCart: any[],
    allProducts: BaseProduct[]
) {
    if (!addButton) return;

    const { clone, textQuantity, quantityElement, cliente } = ctx;

    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    const product = allProducts.find(p => p.id === productId);

    if (product) {
        const variant = product.variants.find(
            v => v.color === productColor && v.size === productSize
        );

        if (variant?.quantity && textQuantity >= variant.quantity) {
            addButton.classList.remove("anable");
            addButton.classList.add("disable");
            showPopUp("Attenzione", "E' stato raggiunto il numero massimo di prodotti disponibili");
            return;
        }
    }

    const productcart = productsCart.find(
        p => p.userId === cliente.id &&
            p.productId === productId &&
            p.color === productColor &&
            p.size === productSize
    );

    if (!productcart) return;

    const newQty = textQuantity + 1;
    productcart.quantity = newQty;

    cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, newQty);

    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
    setSumTotCart(productsCart);

    quantityElement.textContent = newQty.toString();
}




function handleLess(
    lessButton: HTMLButtonElement | null,
    ctx: any,
    productsCart: any[]
) {
    if (!lessButton) return;

    const { clone, textQuantity, quantityElement, cliente } = ctx;

    if (textQuantity <= 1) return;

    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    const productcart = productsCart.find(
        p => p.userId === cliente.id &&
            p.productId === productId &&
            p.color === productColor &&
            p.size === productSize
    );

    if (!productcart) return;

    const newQty = textQuantity - 1;
    productcart.quantity = newQty;

    cliente.updateCartItem(productcart.productId, productcart.color, productcart.size, newQty);

    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
    setSumTotCart(productsCart);

    quantityElement.textContent = newQty.toString();
}




function handleDelete(
    deleteButton: HTMLButtonElement | null,
    ctx: any,
    productsCart: any[],
    userLogId: string
) {
    if (!deleteButton) return;

    const { clone, cliente } = ctx;

    const productId = clone.dataset.id;
    const productColor = clone.dataset.color;
    const productSize = clone.dataset.size;

    if (!productId) return;

    cliente.removeFromCart(productId, productColor, productSize);
    sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));

    const products: BaseProduct[] = JSON.parse(localStorage.getItem("products") || "[]");
    const updated = cliente.getDetailedCart([...ProductsDefault, ...products], userLogId);

    setSumTotCart(updated);
    clone.remove();
}





export async function clickToOrderCart(sectionId: string) {
    const orderButton = document.getElementById("buyButton") as HTMLButtonElement;
    orderButton.addEventListener("click", async () => {
        console.log("cliccatooojnijbugfbi")
        showPopUpSelection("Attenzione", "Effettuare l'ordine?", "SI", "NO")
        const choice = await handleCheckBoxtPoPUp();
        if (choice === "no") return;

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

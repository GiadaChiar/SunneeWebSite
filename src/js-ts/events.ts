
//event functions

import { cleanSection, changeTextContent, setAdminLogin, checkUserLogin, submitLogIn, showPopUp, setSUmTotCart, getRegisteredUsers, showPopUpSelection } from "./dom";
import { Cliente } from './interfaces';
import { insertTemplate, changeCartTemplate } from './templates';
import { ProductsDefault } from './initProducts';
import type { BaseProduct, Variant, CartItem } from './interfaces';










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



//function to remuve elements if I click on reservate area
export function removeElementHtm() {
    const linkReservateArea = document.getElementById("buttonLinkHTML") as HTMLElement | null;
    //click 
    linkReservateArea?.addEventListener("click", function () {
        cleanSection("buttonLinkHTML");
        cleanSection("checksection");
        cleanSection("newRegistration");
        cleanSection("forgotPassword");
        changeTextContent("titleLogIn", "Accesso Riservato:");
        setAdminLogin(true);
        submitLogIn();
    })

}






export function preventSubmitLogIn() {
    const registrationForm = document.getElementById("loginFormStandard") as HTMLFormElement | null;
    registrationForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        checkUserLogin();
    });

}






//listener su cart ogni cart + e - 
//<div class="container-cart">
/*
<div class="add-remove">
                        <button class="bnt-less disable">-</button>
                        <h1 class="quantity">1</h1>
                        <button class="bnt-add anable">+</button>
                    </div>
*/














///PopUpSelect the box listener
export function handleCheckBoxtPoPUp(): Promise<"yes" | "no"> {
    return new Promise((resolve) => {
        // prendi il popup appena inserito
        const popup = document.getElementById("custom-popup");
        if (!popup) return;

        // prendi i checkbox dentro questo popup
        const checkRight = popup.querySelector("#popUCheckright") as HTMLInputElement;
        const checkLeft = popup.querySelector("#popUCheckleft") as HTMLInputElement;
        const saveButton = popup.querySelector("#saveCheck") as HTMLButtonElement;

        saveButton?.addEventListener("click", (event) => {
            event.preventDefault();
            if (checkRight.checked) resolve("yes")
            else resolve("no");
            cleanSection("PopUpHtml");
            // Risolvo la promise con true se il checkbox destro è selezionato, altrimenti false
            /*const isRightChecked = checkRight.checked;
            const isLeftChecked = checkLeft.checked;*/

        });

    })
}



















export function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<Cliente['getDetailedCart']>) {
    const sectionCart = document.getElementById("cartSection")
    if (!sectionCart) return

    console.log("okkk")

    sectionCart?.addEventListener("click", (event) => {

        const users = getRegisteredUsers();

        const userData = users.find(u => u.id === userLogId);
        if (!userData) return;

        const cliente = new Cliente(userData);

        // carica il carrello salvato in sessionStorage
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
                    console.log("   Quantità non disponible ");
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

                // salva di nuovo
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

                // poi aggiorna il DOM
                setSUmTotCart(updatedDetailedCart);
                clone.remove();
            }

            return
        }
    })

}






/*


type CartContext = {
    productId: string;
    userLogId: string;
    textQuantity: number;
    productColor: string;
    productSize: string;
    allProducts: BaseProduct[];
    addButton: HTMLButtonElement;
    productsCart: ReturnType<Cliente['getDetailedCart']>;
    cliente: Cliente;
    quantityElement: HTMLElement;
    lessButton: HTMLButtonElement | null;
};






function clickedButtonAddCart(ctx: CartContext) {
    let {
        productId,
        userLogId,
        textQuantity,
        productColor,
        productSize,
        allProducts,
        addButton,
        productsCart,
        cliente,
        quantityElement,
        lessButton
    } = ctx;


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
            console.log("   Quantità non disponible ");
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

}





function clickedButtonLessCart(ctx: CartContext) {
    let {
        productId,
        userLogId,
        textQuantity,
        productColor,
        productSize,
        productsCart,
        cliente,
        allProducts,
        quantityElement,
        lessButton
    } = ctx;

    textQuantity--;
    let productcart = productsCart.find(p => p && p.userId === userLogId && p.productId === productId && p.color === productColor && p.size === productSize)
    if (!productcart) {
        console.log("Quantità non trovata", productcart)
    } else {
        productcart.quantity = textQuantity;
        console.log("prodotto carrello modificato qunatità ora è: ", productcart.quantity);
        cliente.updateCartItem(productId, productColor, productSize, textQuantity);

        sessionStorage.setItem("cart", JSON.stringify(cliente.getCart()));
        setSUmTotCart(productsCart);
    }
    quantityElement.textContent = textQuantity.toString();
    if (textQuantity <= 1 && lessButton) {
        lessButton.classList.remove("anable")
        lessButton.classList.add("disable");
    }





}







export function cartSetNumberProduct(userLogId: string, productsCart: ReturnType<Cliente['getDetailedCart']>) {
    const sectionCart = document.getElementById("cartSection")
    if (!sectionCart) return

    console.log("okkk")

    sectionCart?.addEventListener("click", (event) => {

        const users = getRegisteredUsers();

        const userData = users.find(u => u.id === userLogId);
        if (!userData) return;

        const cliente = new Cliente(userData);

        // carica il carrello salvato in sessionStorage
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


        //default class button 

        if (addButton) {
            if (productId && productColor && productSize)
                clickedButtonAddCart({
                    productId,
                    textQuantity,
                    productColor,
                    productSize,
                    userLogId,
                    allProducts,
                    addButton,
                    productsCart,
                    cliente,
                    quantityElement,
                    lessButton
                })
            /*
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
                    console.log("   Quantità non disponible ");
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


*/


/*

        } if (clikedLessButton && textQuantity > 1) {
            if (productId && productColor && productSize && addButton)
                clickedButtonLessCart({
                    productId,
                    textQuantity,
                    productColor,
                    productSize,
                    userLogId,
                    allProducts,
                    addButton,
                    productsCart,
                    cliente,
                    quantityElement,
                    lessButton
                })

            /*
            textQuantity--;
            let productcart = productsCart.find(p => p && p.userId === userLogId && p.productId === productId && p.color === productColor && p.size === productSize)
            if (!productcart) {
                console.log("Quantità non trovata", productcart)
            } else {
                productcart.quantity = textQuantity;
                console.log("prodotto carrello modificato qunatità ora è: ", productcart.quantity);

                setSUmTotCart(productsCart);
            }



            quantityElement.textContent = textQuantity.toString();
            if (textQuantity <= 1 && lessButton) {
                lessButton.classList.remove("anable")
                lessButton.classList.add("disable");
            }*/
/*
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

     // poi aggiorna il DOM
     setSUmTotCart(updatedDetailedCart);
     clone.remove();
 }

 return
}
})

}





*/







function uploadQunatityAterOrder() {


}


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

            if(variant.quantity < item.quantityOrder){
                showPopUp("ERRORE","La quantità disponibile è minore di quella richiesta")
            }

    
            variant.quantity -= item.quantityOrder;

            

            console.log("DOPO:", variant.quantity);
            if(variant.quantity === 0){
                variant.state = "unavailable";
            }

            //save 
            localStorage.setItem("products", JSON.stringify(products));


            //clean cart
            if(loggedUserId)
            cliente.cleanFromCart(loggedUserId)

        });



        /*export function setSUmTotCart(products: ReturnType<Cliente['getDetailedCart']>) {
        
            //por each products price and quantity
            const productInfo = products.map(p => ({
                price: p?.price ?? 0,
                quantity: p?.quantity ?? 0,
                total: (p?.price ?? 0) * (p?.quantity ?? 0)
            }));
        
            const totalCart = productInfo.reduce((sum, item) => sum + item.total, 0);
            console.log("La somma totale è :", totalCart)
            let result= totalCart.toFixed(2); 
            changeTextContent("sommaTot",`${result} €`);
        }
        */


        cleanSection("cartHTML"); //clean template 
        cleanSection("Total");
        showPopUp("Conferma", "Pagamento effettuato con successo")
        //uploadQuantityAfterOrder()

    })
}

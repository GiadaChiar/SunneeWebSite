import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';
import '../style/poUp.scss';

import { setUpMenu, checkClickMenu } from './menu';
import { fetchForm } from './form';
import { loadTemplates, changeCartTemplate } from "./templates";
import { getRegisteredUsers } from "./userServices";
import {  changeTextContent } from "./dom";
import { ShopClient } from "./cartInterfaces";
import { getAllProducts } from "./productService";
import type { CartItem } from './cartInterfaces';
//import { clickToOrderCart } from './events';






function getAllCartInfo() {

    const loggedUserId = sessionStorage.getItem("userId");//actual login user

    const allUsers = getRegisteredUsers();

    if (!loggedUserId) return;

    const user = allUsers.find(u => u.id === loggedUserId);

    if (!user) return;
    const nameUser = user.name
    
    changeTextContent("cartTitle", "Buono Shopping " + nameUser)

    const cliente = new ShopClient(user);
    const savedCart = sessionStorage.getItem("cart");

    const allProducts = getAllProducts();

    if (savedCart) {

        const cartItems: CartItem[] = JSON.parse(savedCart);
        cliente.loadCart(cartItems);

        const detailedCart = cliente.getDetailedCart(allProducts,  loggedUserId);

        console.log("USER ID LOGGATO :",loggedUserId )

        changeCartTemplate(detailedCart, loggedUserId);
        
    }
}




export function buildCartContext(event: Event, userLogId: string) {
    const target = event.target as HTMLElement;
    const clone = target.closest(".container-cart") as HTMLElement | null;
    if (!clone) return null;

    const users = getRegisteredUsers();
    const userData = users.find(u => u.id === userLogId);
    if (!userData) return null;

    const cliente = new ShopClient(userData);
    const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
    cliente.loadCart(savedCarts.filter(c => c.userId === userLogId));

    const addButton = target.closest(".bnt-add") as HTMLButtonElement | null;
    const lessButtonClick = target.closest(".bnt-less") as HTMLButtonElement | null;
    const deleteButton = target.closest(".btn-close") as HTMLButtonElement | null;

    const quantityElement = clone.querySelector(".quantity") as HTMLElement | null;
    if (!quantityElement) return null;

    const textQuantity = parseInt(quantityElement.textContent || "0");

    const allProducts = getAllProducts();

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








document.addEventListener("DOMContentLoaded", async() => {
    await loadTemplates();
    setUpMenu();
    checkClickMenu();
    fetchForm();
    getAllCartInfo();
    //clickToOrderCart("buyButton")
});
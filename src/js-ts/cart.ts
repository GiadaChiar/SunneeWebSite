import '../style/index.scss';
import '../style/menu.scss';
import '../style/form.scss';
import '../style/cart.scss';
import '../style/poUp.scss';

import { setUpMenu, checkClickMenu } from './menu';
import { fetchForm } from './form';
import { loadTemplates, changeCartTemplate } from "./templates";
import { getRegisteredUsers } from "./userServices";
import {  changeTextContent, showPopUp } from "./dom";
import { ShopClient } from "./cartInterfaces";
import type { CartItem } from './cartInterfaces';
import { clickToOrderCart } from './events';
import { ProductService } from "./productInterfaces";
import type { BaseProduct } from './productInterfaces';
import { ProductsDefault } from "./initProducts"
import { getAllProducts } from './index';






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
    //const allProducts = getAllProducts();
    const allProducts = ProductService.getAllProducts();

    if (savedCart) {
        const cartItems: CartItem[] = JSON.parse(savedCart);
        cliente.loadCart(cartItems);
        const detailedCart = cliente.getDetailedCart(allProducts,  loggedUserId);

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

    //const allProducts = getAllProducts();
    const allProducts = ProductService.getAllProducts();

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



/*
export function OrderProducts() {
    const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
    const loggedUserId = sessionStorage.getItem("userId");
    const users = getRegisteredUsers();
    const userData = users.find(u => u.id === loggedUserId);

    if (!userData|| !loggedUserId) return;

    const cliente = new ShopClient(userData);
    const myCart = savedCarts.filter(item => item.userId === loggedUserId)
    const products = ProductService.getLocalProducts();

    for (const item of myCart) {
        const product = products.find(p => p.id === item.productId);
        const variant = product?.variants.find(v =>
            v.color === item.color && v.size === item.size
        );

        if (!variant || variant.quantity < item.quantity) {
            showPopUp("ERRORE", "Quantità non disponibile");
            return; 
        }
    }

    //upload stock
    for (const item of myCart) {
        const product = products.find(p => p.id === item.productId);
        const variant = product?.variants.find(v =>
            v.color === item.color && v.size === item.size
        );

        if (!variant) continue;

        variant.quantity -= item.quantity;

        if (variant.quantity === 0) {
            variant.state = "unavailable";
        }
    }

    localStorage.setItem("products", JSON.stringify(products));
    cliente.cleanFromCart(loggedUserId);
}


*/





export function OrderProducts() {
    const savedCarts: CartItem[] = JSON.parse(sessionStorage.getItem("cart") || "[]");
        const loggedUserId = sessionStorage.getItem("userId");
        const users = getRegisteredUsers();
        const userData = users.find(u => u.id === loggedUserId);

        if (!userData) return;

        const cliente = new ShopClient(userData);
        cliente.loadCart(savedCarts.filter(c => c.userId === loggedUserId))
        const myCart = savedCarts.filter(item => item.userId === loggedUserId)
        
        const products = ProductService.getLocalProducts();
        const allProducts = ProductService.getAllProducts();


        const produsctInfo = myCart.map(p => ({
            id: p?.productId,
            color: p?.color,
            size: p?.size,
            quantityOrder: p?.quantity,
        }))

        produsctInfo.forEach(item => {
            const product = allProducts.find(p => p.id === item.id);

            if (!product) return;

            const variant = product.variants.find(v =>
                v.color === item.color && v.size === item.size
            );

            if (!variant)return;

            if (variant.quantity < item.quantityOrder) {
                showPopUp("ERRORE", "La quantità disponibile è minore di quella richiesta")
            }

            variant.quantity -= item.quantityOrder;

            if (variant.quantity === 0) {
                variant.state = "unavailable";
            }
            //save 
            localStorage.setItem("products", JSON.stringify(products));

            //clean cart
            if (loggedUserId)
                cliente.cleanFromCart(loggedUserId)
        });

}




document.addEventListener("DOMContentLoaded", async() => {
    await loadTemplates();
    setUpMenu();
    checkClickMenu();
    fetchForm();
    getAllCartInfo();
    clickToOrderCart();
});